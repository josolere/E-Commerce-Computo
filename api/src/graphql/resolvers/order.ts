import {
  iCreateOrderInput,
  iEditOrderInput,
  iModels,
  iOrder,
} from "../../interfaces";

import db from "../../models";
import { MailOrderCreate } from "../../mailer/functions";
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
          },
        ],
      };

      let data = await models.Order.findByPk(id, options);
      data.details = [];
      data.Products.map((det: any) => {
        const detail = {
          id: det.Productsxorder.id,
          price: det.Productsxorder.price,
          quantity: det.Productsxorder.quantity,
          OrderId: det.Productsxorder.OrderId,
          ProductId: det.Productsxorder.ProductId,
          productName: det.Productsxorder.productName
        };
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
      let i:number = 0;
      data.map((item:any) => {
        data[i].details = []
          item.Products.map((det:any) => {
              const detail = {
                id: det.Productsxorder.id,
                price: det.Productsxorder.price,
                quantity: det.Productsxorder.quantity,
                OrderId: det.Productsxorder.OrderId,
                ProductId : det.Productsxorder.ProductId,
                productName: det.Productsxorder.productName
              };
          data[i].details.push(detail)
          })
          i++;
      })
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

      let orders:any
      status? orders = await models.Order.findAll({ where: { status: status } }) : orders = await models.Order.findAll();
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
      MailOrderCreate(user.email);

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
        return updatedOrder;
      }
      return null;
    },
  },
};
