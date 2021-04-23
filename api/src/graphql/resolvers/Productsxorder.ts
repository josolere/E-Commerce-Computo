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
      const data = await models.Productsxorder.findByPk(id);
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
      const detail = await order.addProduct(product, {
        through: {
          quantity: quantity,
          price: product.price,
          productName: product.name,
        },
      });

      const stock = product.stock - quantity;
      if (product) {
        const updatedProduct = await product.update(
          { stock },
          { where: { idProduct } }
        );
      }

      return detail[0];
    },

    deleteOrderDetail: async (
      _parent: object,
      { id }: { id: string },
      { models }: { models: iModels }
    ): Promise<any> => {
      const OrderDetailToRemove = await models.Productsxorder.findByPk(id);
      if (OrderDetailToRemove) {
        await OrderDetailToRemove.destroy({ where: { id } });
        return OrderDetailToRemove;
      }
      return null;
    },

    editOrderDetail: async (
      _parent: object,
      { id, input }: { id: string; input: iEditOrderDetailInput },
      { models }: { models: iModels }
    ): Promise<any> => {
      const OrderDetailToEdit = await models.Productsxorder.findByPk(id);
      if (OrderDetailToEdit) {
        const updatedOrderDetail = await OrderDetailToEdit.update(
          { ...input },
          { where: { id } }
        );
        return updatedOrderDetail;
      }
      return null;
    },
  },
};
