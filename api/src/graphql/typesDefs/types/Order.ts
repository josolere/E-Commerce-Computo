import { gql } from "apollo-server";

export const typeDefs = gql`
  # object querys mutations RECORDAR USAR MAYÚSCULAS
  type Order {
    id: Int
    status: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getOrderById(id: ID!): Order
    #getOrderByName(name: String): [Order]
  }

  type Mutation {
    createOrder(input: CreateOrderInput, id: ID): Order
    #deleteOrder(id: String!): Order!
    #editOrder(id: String, input: EditOrderInput): Order!
  }

  input CreateOrderInput {
    id: Int
    status: String
  }

  input EditOrderInput {
    status: String
  }
`;
