import { gql } from "apollo-server";

export const typeDefs = gql`
  # object querys mutations RECORDAR USAR MAYÚSCULAS
  type User {
    id: String
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

  type AuthPayload {
    user: User
  }

  type Query {
    getUserById(id: ID!): User
    currentUser: User
    getUsers: [User]
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    deleteUser(id: ID!): User!
    editUser(id: ID, input: EditUserInput): User!

    logout: Boolean
    login(email: String!, password: String!): AuthPayload
    signup(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
<<<<<<< HEAD
      privilege: String
=======
>>>>>>> ba9ea5d80e1f74ec14a56ecfd7f9df8a5d466db0
    ): AuthPayload
  }

  input CreateUserInput {
    id: String
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

  input SignUpInput {
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
