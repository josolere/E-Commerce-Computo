import { gql } from "apollo-server";

export const typeDefs = gql`
  # object querys mutations RECORDAR USAR MAYÚSCULAS
  type Product {
    id: Int
    name: String!
    image: String
    brand: String
    price: Float
    details: String
    categories: [Category]
    reviews: [Review]
    stock: Int
    createdAt: String
    updatedAt: String
  }
  type DiscountCampaign {
    id: Int
    name: String
    type: String
    discount: String
    start: String
    end: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getDiscountCampaign: [DiscountCampaign]
    getDiscountCampaignById(id: ID!): DiscountCampaign
  }

  type Mutation {
    createDiscountCampaign(
      input: CreateDiscountCampaignInput
      idsProducts: [ID]
    ): DiscountCampaign
    deleteDiscountCampaign(id: String!): DiscountCampaign
    editDiscountCampaign(
      id: String
      input: EditDiscountCampaignInput
    ): DiscountCampaign
  }

  input CreateDiscountCampaignInput {
    id: Int
    name: String
    type: String
    discount: String
    start: String
    end: String
  }

  input EditDiscountCampaignInput {
    id: Int
    name: String
    type: String
    discount: String
    start: String
    end: String
  }
`;
