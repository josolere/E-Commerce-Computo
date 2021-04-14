export default {
  Query: {
    getOrderById: async (
      _parent: object,
      { id }: { id: number },
      { models }: { models: any }
    ): Promise<any> => {
      const data = await models.Order.findByPk(id);
      return data;
    },
  },
  Mutation: {
    createOrder: (
      _: any,
      { input }: { input: any },
      { models }: { models: any }
    ): any => models.Order.create({ ...input }),
  },
};
