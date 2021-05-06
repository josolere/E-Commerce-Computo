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
      data.details = [];
      const today = new Date(); //fecha actual
      let auxDiscMoney = 0; //variable para comparar y encontrar el mayor descuento
      data.Products.forEach((det: any) => {
        const detail = {
          id: det.Productsxorder.id,
          price: det.Productsxorder.price,
          quantity: det.Productsxorder.quantity,
          OrderId: det.Productsxorder.OrderId,
          ProductId: det.Productsxorder.ProductId,
          productName: det.Productsxorder.productName,

          //descuentos solo se aplicará uno (el mayor)
          discount: "",
          discountName: "",
          discountType: "",
          discountMoney: 0,
        };

        //analizo campañas de descuento
        det.DiscountCampaigns.forEach((d: any) => {
          //parseo de fechas
          let fStart = new Date();
          fStart.setTime(Date.parse(d.start));
          let fEnd = new Date();
          fEnd.setTime(Date.parse(d.end));

          //analizo si hay un descuento activo
          if (fStart <= today && fEnd >= today) {
            //guardamos el mayor descuento existente
            if (d.type == "porcentaje") {
              const auxPorcentaje = (parseInt(d.discount) * detail.price) / 100;
              auxDiscMoney = auxPorcentaje * detail.quantity;
              console.log(
                "descuento por porcentaje",
                detail.productName,
                typeof auxDiscMoney,
                auxDiscMoney,
                detail.discountMoney
              );
            }
            if (d.type == "cantidad") {
              //parseo el tipo de descuento
              const auxDisc = d.discount.split("x");
              const llevas = 0 + auxDisc[0];
              const pagas = 0 + auxDisc[1];
              const uniDiscount =
                Math.floor(detail.quantity / llevas) * (llevas - pagas);

              auxDiscMoney = uniDiscount * detail.price;
            }
            //comparo cuál descuento es mayor y guardo los datos correspondientes
            if (auxDiscMoney > detail.discountMoney) {
              detail.discount = d.discount;
              detail.discountName = d.name;
              detail.discountType = d.type;
              detail.discountMoney = auxDiscMoney;
            }
          }
        });

        data.details.push(detail);
      });

      //analizo campañas de descuento

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
      { status, idUser }: { status: string; idUser: any },
      { models }: { models: iModels }
    ): Promise<iOrder> => {
      const data = await models.Order.findAll({
        where: { status: status, UserId: idUser },
        include: [
          {
            model: db.Product,
            through: "productsxorder",
            // attributes: ["id", "name"],
          },
        ],
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

        const updatedOrder = await OrderToEdit.update(
          { ...input },
          { where: { id } }
        );

        //si el estado fue cambiado enviar un email informando ese cambio
        const user = await models.User.findByPk(updatedOrder.UserId);

        switch (input.status) {
          //orden finalizada por el usuario
          
          case "creada":
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
     /*       console.log("el array generado es: ", auxproducts);
            orderCreatedMail(
              user.email,
              updatedOrder.id,
              auxproducts,
              user.address,
              user.name
            );
            */
            break;

          //pedido despachado
          case "completa":
            console.log('****************************************************************')
            console.log(user.email);
            orderShippedMail(user.email, user.name, updatedOrder.updatedAt);
        }

        return updatedOrder;
      }
      return null;
    },
  },
};
