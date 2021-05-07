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
    categories: [Category!]
    reviews: [Review]
    stock: Int
    discount: discount
    createdAt: String
    updatedAt: String
  }
  #tipado para descuentos
  type discount {
    percentage: discountPercentage
    quantity: [discountQuantity]
  }
  type discountPercentage {
    percent: Int
    id: Int
    name: String
    end: String
  }
  type discountQuantity {
    id: Int
    name: String
    discount: String
    end: String
  }

  type Query {
    getProducts(filter: FilterProducts): [Product!]
    getProductById(id: ID!): Product
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
    price: Float
    details: String
    categories: [Int]
    stock: Int
  }

  input EditProductInput {
    name: String
    image: String
    brand: String
    price: Float
    details: String
    categories: [ID!]
    stock: Int
  }

  input FilterProducts {
    name: String = ""
    offset: Int = 0
    limit: Int = 100
    categoriesId: [ID]
  }
`;
