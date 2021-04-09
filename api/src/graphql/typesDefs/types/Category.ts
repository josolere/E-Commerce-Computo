import { gql } from "apollo-server";

export const typeDefs = gql`
  # object querys mutations RECORDAR USAR MAYÚSCULAS
  type Category {
    id: Int
    name: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getCategory: [Category!]
  }

  type Mutation {
    createCategory(input: CreateCategoryInput): Category
  }

  input CreateCategoryInput {
    id: Int
    name: String!
  }
`;
