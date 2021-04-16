import {
  iCreateProductInput,
  iEditProductInput,
  iModels,
  iProduct,
  iFilterProducts,
  iAddReviewInput,
} from "../../interfaces";
import Sequelize, { Op } from "sequelize";
import { Category } from "../../models/Category";
import { Review } from "../../models/Review";
import db from "../../models/";

export default {
  Query: {
    getProducts: async (
      _parent: object,
      { filter }: { filter: iFilterProducts },
      { models }: { models: iModels }
    ): Promise<iProduct[]> => {
      if (!filter) {
        filter = { name: "", offset: 0, limit: 10, categoriesId: [0] };
      }
      const limit = filter.limit;
      const offset = filter.offset;
      const categoriesId: number[] = filter.categoriesId || [];
      return models.Product.findAll({
        include:
          categoriesId.length === 0
            ? []
            : [
                {
                  model: db.Category,
                  through: "productsxcategories",
                  attributes: ["name", "id"],
                  where: { id: { [Op.in]: categoriesId } },
                },
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
      const options = {
          include: [{model: db.Category,
            through: "productsxcategories",
            attributes: ["id", "name"]}]
    };
      let product = await models.Product.findByPk(id,options);


      product.categories = []
      product.Categories.map((category:any) => { 
      //  console.log(category.id, category.name)
        product.categories.push({id:category.id, name:category.name})
                                        })
      return product;
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
      console.log(input.categories);
      let categoryArray = input.categories; //para que tome que hay categorias hay que agregarlas en la interfaz del create product input
      let createdProduct = await models.Product.create({ ...input })
      createdProduct.addCategories(input.categories);
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
    /*
    addReview: async(
      _parent: object,
      { id, input }: { id : string; input: iAddReviewInput },
      { models }: { models: iModels }
    ): Promise<any> => {
      const currentProduct = await models.Product.findByPk(input.product,{include:'reviews'})

      let createdReview = await Review.create({ ...input})

      console.log(currentProduct)

      currentProduct.addReview(createdReview)

      return createdReview

    }
    */
  },
};
