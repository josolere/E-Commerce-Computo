import { gql } from "apollo-server";

export const typeDefs = gql`
  # object querys mutations RECORDAR USAR MAYÚSCULAS
  type Product {
    id: Int
    name: String!
    image: String
    brand: String
    price: Int
    details: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getProducts: [Product!]
  }

  type Mutation {
    createProduct(input: CreateProductInput): Product
  }

  input CreateProductInput {
    id: Int
    name: String!
    image: String
    brand: String
    price: Int
    details: String
  }
`;
