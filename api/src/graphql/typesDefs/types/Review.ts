import { gql } from "apollo-server";

export const typeDefs = gql`

type Query{
  getReviews(id: Int): [Review]
}


#Estos datos devuelve
type Review{
    id: Int
    text: String
    rating: Int
}
##Estos datos entran
input AddReviewInput{
    rating: Int
    text: String
    product: Int
  }

type Mutation{
    addReview(id: Int, input: AddReviewInput): Review
  }

`;