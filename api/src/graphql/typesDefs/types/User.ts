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
    googleId: String
    createdAt: String
    updatedAt: String
    address: String
    street: String
    city: String
    state: String
    zip: String
    phone: String
   resetPass: String 

  }
  

  type AuthPayload {
    user: User
  }

  type Query {
    getUserById(id: ID!): User
    getUserByEmail(email: String): User
    currentUser: User
    getUsers: [User]
    getWishList(userId: String): [Product]
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    deleteUser(id: ID!): User!
    editUser(id: ID, input: EditUserInput): User
    toggleWishlist(productId: ID, userId: String): [Product]

    logout: Boolean
    login(email: String!, password: String!): AuthPayload
    signup(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      username: String
      address: String
      street: String
      city: String
      state: String
      zip: String
      phone: String
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
    street: String
    city: String
    state: String
    zip: String
    phone: String
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
    street: String
    city: String
    state: String
    zip: String
    phone: String
    resetPass: String
    previousPassword: String
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
    street: String
    city: String
    state: String
    zip: String
    phone: String
  }
`;
