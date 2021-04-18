import {
    iModels,
    iAddReviewInput,
  } from "../../interfaces";
  import Sequelize, { Op } from "sequelize";
  import { Category } from "../../models/Category";
  import { Review } from "../../models/Review";
  import db from "../../models/";

  export default {
    Query:{
        getReviews: async(
            _parent: object,
            { id } : { id: number;},
            { models }: { models: iModels }
            ): Promise<any> => {
                let currentProduct = await models.Product.findByPk(id, {include: 'reviews'})
                let reviews = await currentProduct.getReviews()
                console.log(reviews)

                return reviews;
            }


    },


   Mutation:{
    addReview: async(
      _parent: object,
      { id, input }: { id : string; input: iAddReviewInput },
      { models }: { models: iModels }
    ): Promise<any> => {
      const currentProduct = await models.Product.findByPk(id,{include:'reviews'})

      let createdReview = await Review.create({ ...input})

      console.log(currentProduct)

      currentProduct.addReview(createdReview)

      return createdReview

    }

}
    }