export default {
  Query: {
    getCategory: (_: any, _args: any, { models }: { models: any }): any[] => {
      return models.Category.findAll();
    },
  },
  Mutation: {
    createCategory: (
      _: any,
      { input }: { input: any },
      { models }: { models: any }
    ): any => models.Category.create({ ...input }),
  },
};
