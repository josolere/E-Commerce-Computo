import {
  iCreateOrderDetailInput,
  iEditOrderDetailInput,
  iModels,
  iOrderDetail,
} from "../../interfaces";
// import { Product } from "../../models/Product";
// import OrderDetail from "../../models";

export default {
  Query: {
    getProductsCompatibilities: async (
      _parent: object,
      { idProduct }: { idProduct: number },
      { models }: { models: iModels }
    ): Promise<any> => {
      const data = await models.Product.findAll({
        where: { id: idProduct },
        include: [
          {
            model: models.Product,
            as: "productCompatibility",
            include: [models.Category],
          },
        ],
      });
      //console.log(data);
      // console.log(data[0].productCompatibility[0].Categories);
      return data[0].productCompatibility;
    },
  },
  Mutation: {
    createFatherCompatibilities: async (
      _parent: object,
      {
        HeadIdProduct,
        idsProducts,
      }: { HeadIdProduct: [number]; idsProducts: number },
      { models }: { models: iModels }
    ): Promise<any> => {
      const product = await models.Product.findByPk(idsProducts);
      for (let i = 0; i < HeadIdProduct.length; i++) {
        const products = await models.Product.findByPk(HeadIdProduct[i]);
        await products.addProductCompatibility(product);
      }
      return product;
    },
    createCompatibility: async (
      _parent: object,
      {
        HeadIdProduct,
        idsProducts,
      }: { HeadIdProduct: number; idsProducts: [number] },
      { models }: { models: iModels }
    ): Promise<any> => {
      const product = await models.Product.findByPk(HeadIdProduct);
      //console.log(product);

      for (let i = 0; i < idsProducts.length; i++) {
        const products = await models.Product.findByPk(idsProducts[i]);
        // await product.addProducts(products);
        await product.addProductCompatibility(products);
      }
      return product;
    },
  },
};
