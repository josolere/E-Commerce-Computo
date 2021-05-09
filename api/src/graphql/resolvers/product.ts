import {
  iCreateProductInput,
  iEditProductInput,
  iModels,
  iProduct,
  iFilterProducts,
  iAddReviewInput,
} from "../../interfaces";
import Sequelize, { Op } from "sequelize";
import db from "../../models/";
import { any } from "sequelize/types/lib/operators";

export default {
  Query: {
    getProducts: async (
      _parent: object,
      { filter }: { filter: iFilterProducts },
      { models }: { models: iModels }
    ): Promise<iProduct[]> => {
      if (!filter) {
        filter = { name: "", offset: 0, limit: 100, categoriesId: [0] };
      }
      const limit = filter.limit;
      const offset = filter.offset;
      const categoriesId: number[] = filter.categoriesId || [];
      return models.Product.findAll({
        include:
          categoriesId.length === 0
            ? [{ model: models.DiscountCampaign }]
            : [
                { model: models.DiscountCampaign },
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
    /* getProductsBuild: async (
      _parent:object,
      args: any,
      context: any
    ): Promise<any> => {
      let products = await context.models.Product.findAll({
        include: Category
      })

      products.forEach((item:any) => {
        item.categories = item.dataValues.Categories
      })
      console.log(products)

      return products;
    }, */
    
    getProductById: async (
      _parent: object,
      { id }: { id: number },
      { models }: { models: iModels }
    ): Promise<iProduct> => {
      // let product = await models.Product.findByPk(id, {
      // include: [{ association: 'categories'},{ association: 'reviews' }]
      // }
      // )
      const options = {
        include: [
          { model: models.DiscountCampaign },
          {
            model: db.Category,
            through: "productsxcategories",
            attributes: ["id", "name"],
          },
        ],
      };
      let product = await models.Product.findByPk(id, options);
      product.categories = [];
      product.Categories.map((category: any) => {
        product.categories.push({ id: category.id, name: category.name });
      });
      // console.log(product);
      product.reviews = await product.getReviews();
      //console.log("el producto es:", product.DiscountCampaigns);

      //analizo si el producto tiene campañas de descuento activas
      const today = new Date(); //fecha actual
      let discount = {
        //objeto para guardar datos de descuentos activos
        percentage: {
          percent: 0,
          id: 0,
          name: "",
          end: "",
        },
        quantity: [{}],
      };
      product.DiscountCampaigns.forEach((campaign: any) => {
        //parseo de fechas
        let fStart = new Date();
        fStart.setTime(Date.parse(campaign.start));
        let fEnd = new Date();
        fEnd.setTime(Date.parse(campaign.end));

        //analizo si corresponde un descuento
        if (fStart <= today && fEnd >= today) {
          //guardo el mayor descuento porcentual activo
          if (
            campaign.type === "porcentaje" &&
            discount.percentage.percent < parseInt(campaign.discount)
          ) {
            discount.percentage.percent = parseInt(campaign.discount);
            discount.percentage.id = campaign.id;
            discount.percentage.name = campaign.name;
            discount.percentage.end = campaign.end;
          }
          //guardo todos los descuentos activos por cantidades
          if (campaign.type === "cantidad") {
            const detail: object = {
              id: campaign.id,
              name: campaign.name,
              discount: campaign.discount,
              end: campaign.end,
            };
            discount.quantity.push(detail);
          }
        }
      });
      product.discount = discount;
      // console.log("producto con descuentos", product.DiscountCampaigns);
      return product;
    },

    /* 
    const options = {
          include: [{model: db.Category,
            through: "productsxcategories",
            attributes: ["id", "name"]}]
    };
      let product = await models.Product.findByPk(id,options);
      product.categories = []
      product.Categories.map((category:any) => { 
        product.categories.push({id:category.id, name:category.name})
      })

    */

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
      let categoryArray = input.categories; //para que tome que hay categorias hay que agregarlas en la interfaz del create product input
      let createdProduct = await models.Product.create({ ...input });
      await createdProduct.addCategories(input.categories);
      const options = {
        include: [
          {
            model: db.Category,
            through: "productsxcategories",
            attributes: ["id", "name"],
          },
        ],
      };
      let product = await models.Product.findByPk(
        createdProduct.dataValues.id,
        options
      );
      product.categories = [];
      product.Categories.map((category: any) => {
        product.categories.push({ id: category.id, name: category.name });
      });
      return product;
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

        // elimino sus antiguas categorias
        const options = {
          include: [
            {
              model: db.Category,
              through: "productsxcategories",
              attributes: ["id", "name"],
            },
          ],
        };

        const product = await models.Product.findByPk(id, options);

        product.categories = [];
        product.Categories.map((category: any) => {
          product.categories.push(category.id);
        });
        productToEdit.removeCategories(product.categories);

        //inserto las nuevas
        // .log(input.categories.length);

        await productToEdit.addCategories(input.categories);

        return { updatedProduct };
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

      .log(currentProduct)

      currentProduct.addReview(createdReview)

      return createdReview

    }
    */
  },
};
