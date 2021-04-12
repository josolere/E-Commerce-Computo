import {
  iCreateProductInput,
  iEditProductInput,
  iModels,
  iProduct,
  iFilterProducts
} from "../../interfaces";
<<<<<<< HEAD
import Sequelize from "sequelize";
import { Category } from "../../models/Category";
import { idText } from "typescript";
import category from "./category";
=======
import Sequelize,{ Op } from "sequelize";
import { Category } from "../../models/Category";
>>>>>>> 9311e295c0b36c2172f20363dd8e643215661752

export default {
  Query: {
    getProducts: async (
      _parent: object,
      { filter }: {filter:iFilterProducts},
      { models }: { models: iModels }
<<<<<<< HEAD
    ): Promise<iProduct[]> => {
      let productsFetch = await models.Product.findAll({
          include: Category,
          raw : false
        })
      /* console.log(productsFetch[0].dataValues.Categories)

      /* let products = productsFetch.map((product: any) =>{
        let categories = product.Categories.map((category))

      }) */
    //   var newArray = Product.dataValues.Categories.map(item =>{
    //     return item.dataValues.name
    //  })


      return productsFetch;
=======
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
>>>>>>> 9311e295c0b36c2172f20363dd8e643215661752
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
<<<<<<< HEAD
    createProduct: async (
      _parent: object,
      { input }: { input: iCreateProductInput },
      { models }: { models: iModels }
    ): Promise<any> => {
      console.log(input.categories)
      let categoryArray = input.categories;  //para que tome que hay categorias hay que agregarlas en la interfaz del create product input

      let createdProduct = await models.Product.create({ ...input })
      categoryArray.forEach((item: any) => {
        //let currentCategory = await models.Category.findByPk(item)

        createdProduct.addCategory(item)
      })
      return createdProduct;
    },
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
=======
    createProduct: (
      _: any,
      { input }: { input: any },
      { models }: { models: any }
    ): any => models.Product.create({ ...input }),
>>>>>>> 9311e295c0b36c2172f20363dd8e643215661752
  },
};
