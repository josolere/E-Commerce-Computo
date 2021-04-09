export default {
  Query: {
    getProducts: (_: any, _args: any, { models }: { models: any }): any[] => {
      return models.Product.findAll();
    },
  },
  Mutation: {
    createProduct: (
      _: any,
      { input }: { input: any },
      { models }: { models: any }
    ): any => models.Product.create({ ...input }),
  },
};
