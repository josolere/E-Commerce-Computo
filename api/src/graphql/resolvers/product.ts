import {
  iCreateProductInput,
  iEditProductInput,
  iModels,
  iProduct,
  iFilterProducts
} from "../../interfaces";
import Sequelize,{ Op } from "sequelize";
import { Category } from "../../models/Category";

export default {
  Query: {
    getProducts: (
      _parent: object,
      { filter }: {filter:iFilterProducts},
      { models }: { models: iModels }
    ): iProduct[] => {
      if(!filter) {filter={name:'',offset:0,limit:10}}
        const limit = filter.limit
        const offset = filter.offset
        const categoriesId = filter.categoriesId || []
        return models.Product.findAll({
          include : categoriesId.length===0? [] : [{ model: Category, through: 'productsxcategories',attributes:[], where : { id : {[Op.in] : categoriesId} }}], 
          where: {
            [Op.and] : [
              { name : {[Op.iLike] : `%${filter.name}%` }},
            ]      
          },
            limit,
            offset
          }
      );
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
  },
};
