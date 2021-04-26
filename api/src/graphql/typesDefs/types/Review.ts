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
    userId: String
}
##Estos datos entran
input AddReviewInput{
    rating: Int
    text: String
    userId: String
  }

type Mutation{
    addReview(id: Int, userId:String, input: AddReviewInput): Review
  }

`;