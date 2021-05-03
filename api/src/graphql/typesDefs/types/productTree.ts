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
    Categories: [Category]
    reviews: [Review]
    stock: Int
    createdAt: String
    updatedAt: String
  }

  type Query {
    getProductsCompatibilities(idProduct: ID): [Product]
  }

  type Mutation {
    createCompatibility(HeadIdProduct: ID, idsProducts: [ID]): Product
    deleteCompatibilities(idCompatibility: ID): Boolean
  }
`;
