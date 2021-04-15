import { gql } from "apollo-server";

export const typeDefs = gql`
  # object querys mutations RECORDAR USAR MAYÚSCULAS
  type User {
    id: Int
    username: String
    password: String
    email: String
    privilege: String
    active: Boolean
    name: String
    surname: String
    createdAt: String
    updatedAt: String
    address: String
  }

  type Query {
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    deleteUser(id: ID!): User!
    editUser(id: ID, input: EditUserInput): User!
  }

  input CreateUserInput {
    id: Int
    username: String
    password: String
    email: String
    privilege: String
    active: Boolean
    name: String
    surname: String
    address: String
  }

  input EditUserInput {
    username: String
    password: String
    email: String
    privilege: String
    active: Boolean
    name: String
    surname: String
    address: String
  }
`;
