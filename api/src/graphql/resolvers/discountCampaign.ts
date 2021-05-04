import {
  iCreateDiscountCampaignInput,
  iEditDiscountCampaignInput,
  iModels,
  iDiscountCampaign,
} from "../../interfaces";
import db from "../../models/";

export default {
  Query: {
    getDiscountCampaign: async (
      _parent: object,
      _args: object,
      { models }: { models: iModels }
    ): Promise<iDiscountCampaign[]> => {
      const campaign = await models.DiscountCampaign.findAll();
      return campaign;
    },
    getDiscountCampaignById: async (
      _parent: object,
      { id }: { id: number },
      { models }: { models: iModels }
    ): Promise<iDiscountCampaign> => {
      const campaign = await models.DiscountCampaign.findByPk(id);

      return campaign;
    },
  },
  Mutation: {
    createDiscountCampaign: async (
      _parent: object,
      {
        input,
        idsProducts,
      }: { input: iCreateDiscountCampaignInput; idsProducts: number[] },
      { models }: { models: iModels }
    ): Promise<iDiscountCampaign> => {
      const campaign = await models.DiscountCampaign.create({ ...input });
      for (let i = 0; i < idsProducts.length; i++) {
        const products = await models.Product.findByPk(idsProducts[i]);
        await campaign.addProducts(products);
      }
      return campaign;
    },
  },
};
