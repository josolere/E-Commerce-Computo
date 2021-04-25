import {
  iCreateOrderDetailInput,
  iEditOrderDetailInput,
  iModels,
  iOrderDetail,
} from "../../interfaces";
import OrderDetail from "../../models";

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
      { input, idOrder }: { input: iCreateOrderDetailInput; idOrder: number },
      { models }: { models: iModels }
    ): Promise<iOrderDetail> => {
      const detail = await models.OrderDetail.create({ ...input });
      const order = await models.Order.findByPk(idOrder);
      detail.setOrder(order);
      return detail;
    },
  },
};
