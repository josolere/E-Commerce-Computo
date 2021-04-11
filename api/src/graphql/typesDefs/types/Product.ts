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
    getProductById(id: String!): Product
    getProductByName(name: String): [Product]
  }

  type Mutation {
    createProduct(input: CreateProductInput): Product
    deleteProduct(id: String!): Product!
    editProduct(id: String, input: EditProductInput): Product!
  }

  input CreateProductInput {
    id: Int
    name: String!
    image: String
    brand: String
    price: Int
    details: String
    categories: [Int]
  }
  input EditProductInput {
    name: String
    image: String
    brand: String
    price: Int
    details: String
  }
`;
