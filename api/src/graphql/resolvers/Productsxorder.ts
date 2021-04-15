import {
  iCreateOrderDetailInput,
  iEditOrderDetailInput,
  iModels,
  iOrderDetail,
} from "../../interfaces";
// import OrderDetail from "../../models";

export default {
  Query: {
    getOrderDetailById: async (
      _parent: object,
      { id }: { id: number },
      { models }: { models: iModels }
    ): Promise<iOrderDetail> => {
      const data = await models.Order.findByPk(id);
      return data;
    },
  },
  Mutation: {
    createOrderDetail: async (
      _parent: object,
      {
        idProduct,
        idOrder,
        quantity,
      }: { idProduct: number; idOrder: number; quantity: number },
      { models }: { models: iModels }
    ): Promise<iOrderDetail> => {
      const product = await models.Product.findByPk(idProduct);
      const order = await models.Order.findByPk(idOrder);
      order.addProduct(product, { through: { quantity: quantity } });

      return order;
    },
  },
};
