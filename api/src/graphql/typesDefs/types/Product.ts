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
    createdAt: String
    updatedAt: String
  }

  type Query {
    getProducts(filter:FilterProducts): [Product!]
    getProductById(id: ID!): Product
    getProductByName(name: String): [Product]
  }

  type Mutation {
    createProduct(input: CreateProductInput): Product
  }

  input CreateProductInput {
    id: Int
    name: String!
    image: String
    brand: String
    price: Float
    details: String
  }
  
  input EditProductInput {
    name: String
    image: String
    brand: String
    price: Float
    details: String
  }

  input FilterProducts {
    name:String = "", 
    offset:Int = 0, 
    limit:Int = 10, 
    categoriesId:[Int]
  }

`;
