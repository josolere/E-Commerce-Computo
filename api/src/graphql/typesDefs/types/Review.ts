import { gql } from "apollo-server";

export const typeDefs = gql`

type Query{
  getReviews(id: Int): [Review]
}


#Estos datos devuelve
type Review{
    id: Int
    title: String
    text: String
    rating: Int
    userId: String
}
##Estos datos entran
input AddReviewInput{
    rating: Int
    title: String
    text: String
    userId: String
    product: Int
  }

type Mutation{
    addReview(id: Int, userId:String, input: AddReviewInput): Review
  }

`;