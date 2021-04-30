import {
  iCreateOrderInput,
  iEditOrderInput,
  iModels,
  iOrder,
} from "../../interfaces";

import db from "../../models";
import {
  OrderCreateMail,
  StatusChangeMail,
  orderCreatedMail,
  orderShippedMail,
} from "../../mailer/functions";
import { any } from "sequelize/types/lib/operators";

export default {
  Query: {
    getOrderById: async (
      _parent: object,
      { id }: { id: number },
      { models }: { models: iModels }
    ): Promise<iOrder> => {
      const options = {
        include: [
          {
            model: db.Product,
            through: "productsxorder",
            attributes: ["id", "name"],
            include: [
              {
                model: db.DiscountCampaign,
                through: "discountCampaignxproduct",
              },
            ],
          },
        ],
      };

      let data = await models.Order.findByPk(id, options);
      //console.log("data completa",data);
      // console.log("array de productos", data.Products);
      // console.log(
      //   "descuentos del primer elemento",
      //   data.Products[0].DiscountCampaigns[0].name
      // );
      data.details = [];
      const today = new Date(); //fecha actual
      data.Products.forEach((det: any) => {
        const detail = {
          id: det.Productsxorder.id,
          price: det.Productsxorder.price,
          quantity: det.Productsxorder.quantity,
          OrderId: det.Productsxorder.OrderId,
          ProductId: det.Productsxorder.ProductId,
          productName: det.Productsxorder.productName,
          //descuentos
          // podria analizar la fecha actual aqui mismo para saber si debo poner o no el descuento

          discount: "",
          discountName: "",
          discountType: "",
          discountMoney: 0,
        };
        det.DiscountCampaigns.forEach((d: any) => {
          //parseo de fechas
          let fStart = new Date();
          fStart.setTime(Date.parse(d.start));
          let fEnd = new Date();
          fEnd.setTime(Date.parse(d.end));

          //analizo si corresponde un descuento
          if (fStart <= today && fEnd >= today) {
            //guardamos el mayor descuento existente
            if (
              d.type == "porcentaje" &&
              0 + detail.discount < 0 + d.discount
            ) {
              detail.discount = d.discount;
              const auxPorcentaje = (d.discount * detail.price) / 100;
              detail.discountMoney = auxPorcentaje * detail.quantity;
              console.log(
                "envio detalle descuento",
                detail.discountMoney,
                typeof detail.discountMoney
              );

              detail.discountName = d.name;
              detail.discountType = d.type;
            }
            if (d.type == "cantidad") {
              //parseo el tipo de descuento
              const auxDisc = d.discount.split("x");
              const llevas = 0 + auxDisc[0];
              const pagas = 0 + auxDisc[1];
              const uniDiscount =
                Math.floor(detail.quantity / llevas) * (llevas - pagas);
              detail.discount = d.discount;

              detail.discountMoney = uniDiscount * detail.price;

              detail.discountName = d.name;
              detail.discountType = d.type;
            }
            //podría guardar el discMoney en unavariable aux y comparar para quedarme con el mayor...
          }
          //analizo si es del tipo unidades y revisar % quantity
        });
        data.details.push(detail);
      });
      return data;
    },

    getOrdersByIdUser: async (
      _parent: object,
      { idUser }: { idUser: number },
      { models }: { models: iModels }
    ): Promise<iOrder> => {
      const options = {
        include: [
          {
            model: db.Product,
            through: "productsxorder",
          },
        ],
      };
      const data = await models.Order.findAll({
        include: [
          {
            model: db.Product,
            through: "productsxorder",
            // attributes: ["id", "name"],
          },
        ],
        where: {
          UserId: idUser,
        },
      });
      let i: number = 0;
      data.map((item: any) => {
        data[i].details = [];
        item.Products.map((det: any) => {
          const detail = {
            id: det.Productsxorder.id,
            price: det.Productsxorder.price,
            quantity: det.Productsxorder.quantity,
            OrderId: det.Productsxorder.OrderId,
            ProductId: det.Productsxorder.ProductId,
            productName: det.Productsxorder.productName,
          };
          data[i].details.push(detail);
        });
        i++;
      });
      return data;
    },

    getOrderByStatus: async (
      _parent: object,
      { status }: { status: string },
      { models }: { models: iModels }
    ): Promise<iOrder> => {
      const orders = await models.Order.findAll({ where: { status: status } });
      return orders;
    },

    getAllOrders: async (
      _parent: object,
      { status }: { status: string },
      { models }: { models: iModels }
    ): Promise<iOrder> => {
      let orders: any;
      status
        ? (orders = await models.Order.findAll({ where: { status: status } }))
        : (orders = await models.Order.findAll());
      return orders;
    },
  },

  Mutation: {
    createOrder: async (
      _parent: object,
      { input, idUser }: { input: iCreateOrderInput; idUser: number },
      { models }: { models: iModels }
    ): Promise<iOrder> => {
      const order = await models.Order.create({ ...input });
      const user = await models.User.findByPk(idUser);
      order.setUser(user);

      //mail
      //OrderCreateMail(user.email);

      return order;
    },

    deleteOrder: async (
      _parent: object,
      { id }: { id: string },
      { models }: { models: iModels }
    ): Promise<any> => {
      const OrderToRemove = await models.Order.findByPk(id);
      if (OrderToRemove) {
        await OrderToRemove.destroy({ where: { id } });
        return OrderToRemove;
      }
      return null;
    },

    editOrder: async (
      _parent: object,
      { id, input }: { id: string; input: iEditOrderInput },
      { models }: { models: iModels }
    ): Promise<any> => {
      const OrderToEdit = await models.Order.findByPk(id);
      if (OrderToEdit) {
        let confirmAt = null;
        if (input.status === "creada") {
          confirmAt = Date.now();
        }
        const updatedOrder = await OrderToEdit.update(
          { ...input, confirmAt },
          { where: { id } }
        );

        //si el estado fue cambiado enviar un email informando ese cambio
        const user = await models.User.findByPk(updatedOrder.UserId);

        switch (input.status) {
          //orden finalizada por el usuario
          case "procesando":
            let auxproducts: any = [];
            const idOrder: any = updatedOrder.id;

            const aux = await models.Productsxorder.findAll({
              where: {
                OrderId: idOrder,
              },
            });
            auxproducts = aux.map((p: any) => {
              return {
                name: p.dataValues.productName,
                price: p.dataValues.price,
                quantity: p.dataValues.quantity,
              };
            });
            orderCreatedMail(
              user.email,
              updatedOrder.id,
              auxproducts,
              user.address,
              user.name
            );
            break;

          //pedido despachado
          case "completa":
            orderShippedMail(user.email, user.name, updatedOrder.updatedAt);
        }

        return updatedOrder;
      }
      return null;
    },
  },
};
