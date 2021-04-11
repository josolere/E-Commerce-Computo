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
<<<<<<< HEAD
    getProducts(filter:FilterProducts): [Product!]
    getProductById(id: ID!): Product
    getProductByName(name: String): [Product]
=======
    getProducts: [Product!]
>>>>>>> 72a58178d9cb35babda10ad595dc6c92d30c770c
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
<<<<<<< HEAD
  input EditProductInput {
    name: String
    image: String
    brand: String
    price: Int
    details: String
  }

  input FilterProducts {
    name:String = "", 
    offset:Int = 0, 
    limit:Int = 10, 
    categoriesId:[Int]
  }

=======
>>>>>>> 72a58178d9cb35babda10ad595dc6c92d30c770c
`;
