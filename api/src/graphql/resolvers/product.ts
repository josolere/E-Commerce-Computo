import {
  iCreateProductInput,
  iEditProductInput,
  iModels,
  iProduct,
  iFilterProducts,
} from "../../interfaces";
import Sequelize, { Op } from "sequelize";
import Category from "../../models";
import db from "../../models";

export default {
  Query: {
    getProducts: (
      _parent: object,
      { filter }: { filter: iFilterProducts },
      { models }: { models: iModels }
    ): iProduct[] => {
      if (!filter) {
        filter = { name: "", offset: 0, limit: 10, categoriesId:[0] };
      }
      const limit = filter.limit;
      const offset = filter.offset;
      const categoriesId: number[] = filter.categoriesId || [];
      //const categoriesId: number[] = [1];

      //console.log(categoriesId)

      //categoriesId.length === 0? [] : [{ model: Category, through: "productsxcategories", attributes: [], where: { id: { [Op.in]: [1] } }}],

      return models.Product.findAll({
        include:
        categoriesId.length === 0? [] : 
        [
          {
            model: db.Category, through: "productsxcategories", attributes: ["name", "id"], where : { id : {[Op.in] : categoriesId}}
          }
        ],
        where: {
          [Op.and]: [{ name: { [Op.iLike]: `%${filter.name}%` } }],
        },
        limit,
        offset,
      });
    },
    getProductById: async (
      _parent: object,
      { id }: { id: number },
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
      _: any,
      { input }: { input: any },
      { models }: { models: any }
    ): any => models.Product.create({ ...input }),
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
