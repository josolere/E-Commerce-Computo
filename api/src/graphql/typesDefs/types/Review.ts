import { gql } from "apollo-server";

export const typeDefs = gql`

#Estos datos devuelve
type Review{
    id: Int
    text: String
    rating: Int
}
##Estos datos entran
input AddReviewInput{
    user: String
    rating: Int
    text: String
    product: Int
  }

type Mutation{
    addReview(id: String, input: AddReviewInput): Review
  }

`;