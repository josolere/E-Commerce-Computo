import { iCreateProductInput, iModels, iProduct } from "../../interfaces";
const Sequelize = require("sequelize");

export default {
  Query: {
    getProducts: (
      _parent: object,
      _args: object,
      { models }: { models: iModels }
    ): iProduct[] => {
      return models.Product.findAll();
    },
    /*
    getProductById: async (
      _parent: object,
      { id }: { id: string },
      { models }: { models: iModels }
    ): Promise<iProduct> => {
      const data = await models.Product.findByPk(id);
      return data;
    },
 */
    getProductByName: async (
      _parent: object,
      { name }: { name: string },
      { models }: { models: iModels }
    ): Promise<iProduct[]> => {
      const data = await models.Product.findAll({
        where: {
          // name : {[Op.iLike] : %${name}% }
          name: { [Sequelize.Op.iLike]: `%${name}%` },
          // name,
        },
      });
      return data;
    },
  },
  Mutation: {
    createProduct: (
      _parent: object,
      { input }: { input: iCreateProductInput },
      { models }: { models: iModels }
    ): iProduct => models.Product.create({ ...input }),
  },
};
