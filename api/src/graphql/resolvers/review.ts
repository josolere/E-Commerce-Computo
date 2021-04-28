import {
    iModels,
    iAddReviewInput,
  } from "../../interfaces";
  import Sequelize, { Op } from "sequelize";
  import { Category } from "../../models/Category";
  import { Review } from "../../models/Review";
  import { UserInputError } from 'apollo-server'

  export default {
    Query:{
        getReviews: async(
            _parent: object,
            { id } : { id: number;},
            { models }: { models: iModels }
            ): Promise<any> => {
                let currentProduct = await models.Product.findByPk(id, {include: 'reviews'})
                let reviews = await currentProduct.getReviews()
                return reviews;
            }
    },


   Mutation:{
    addReview: async(
      _parent: object,
      { id,  input }: { id : string;  input: iAddReviewInput },
      { models }: { models: iModels }
    ): Promise<any> => {
      const currentProduct = await models.Product.findByPk(id,{include:'reviews'})
      const currentUser = await models.User.findByPk(input.userId)
      console.log(currentUser)

      let productReviews = await currentProduct.getReviews();
      console.log(productReviews)
      
      if(productReviews.find((item:any) => item.dataValues.userId === input.userId)){

        throw new UserInputError('Este usuario ya hizo una review a este producto');
    }
      let createdReview = await Review.create({ ...input})


      currentProduct.addReview(createdReview)
      currentUser.addReview(createdReview)

      return createdReview

    }

  }
}