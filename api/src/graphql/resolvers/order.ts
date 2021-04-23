import {
  iCreateOrderInput,
  iEditOrderInput,
  iModels,
  iOrder,
} from "../../interfaces";

import db from "../../models";
import product from "./product";

export default {
  Query: {
    getOrderById: async (
      _parent: object,
      { id }: { id: number },
      { models }: { models: iModels }
      ): Promise<iOrder> => {

      const options = {
        include: [{model: db.Product,
          through: "productsxorder",
          attributes: ["id","name"]
        }]
    };

      let data = await models.Order.findByPk(id,options);
      data.details = [];
      data.Products.map((det:any) => {
        const detail = {
                          id: det.Productsxorder.id, 
                          price : det.Productsxorder.price, 
                          quantity: det.Productsxorder.quantity, 
                          OrderId: det.Productsxorder.OrderId,
                          ProductId: det.Productsxorder.ProductId 
                        }
        data.details.push(detail)
      })
      console.log(data)
      return data;
    },

    getOrdersByIdUser: async (
      _parent: object,
      { idUser }: { idUser: number },
      { models }: { models: iModels }
    ): Promise<iOrder> => {
      const data = await models.Order.findAll({
        where: {
          UserId: idUser,
        },
      });
      return data;
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
