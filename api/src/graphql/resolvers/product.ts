import {
  iCreateProductInput,
  iEditProductInput,
  iModels,
  iProduct,
} from "../../interfaces";
import Sequelize from "sequelize";

export default {
  Query: {
    getProducts: (
      _parent: object,
      _args: object,
      { models }: { models: iModels }
    ): iProduct[] => {
      return models.Product.findAll();
    },
    getProductById: async (
      _parent: object,
      { id }: { id: string },
      { models }: { models: iModels }
    ): Promise<iProduct> => {
      const data = await models.Product.findByPk(id);
      return data;
    },
    getProductByName: async (
      _parent: object,
      { name }: { name: string },
      { models }: { models: iModels }
    ): Promise<iProduct> => {
      const data = await models.Product.findAll({
        where: {
          name: { [Sequelize.Op.iLike]: `%${name}%` },
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

    deleteProduct: async (
      _parent: object,
      { id }: { id: string },
      { models }: { models: iModels }
    ): Promise<any> => {
      const productToRemove = await models.Product.findByPk(id);

      if (productToRemove) {
        await productToRemove.destroy({ where: { id } });
        return productToRemove;
      }

      return null;
    },
    editProduct: async (
      _parent: object,
      { id, input }: { id: string; input: iEditProductInput },
      { models }: { models: iModels }
    ): Promise<any> => {
      const productToEdit = await models.Product.findByPk(id);

      if (productToEdit) {
        const updatedProduct = await productToEdit.update(
          { ...input },
          { where: { id } }
        );

        return updatedProduct;
      }

      return null;
    },
  },
};
