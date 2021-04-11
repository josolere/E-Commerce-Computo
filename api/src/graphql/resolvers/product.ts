import {
  iCreateProductInput,
  iEditProductInput,
  iModels,
  iProduct,
} from "../../interfaces";
import Sequelize from "sequelize";
import { Category } from "../../models/Category";
import { idText } from "typescript";
import category from "./category";

export default {
  Query: {
    getProducts: async (
      _parent: object,
      _args: object,
      { models }: { models: iModels }
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
  },
};
