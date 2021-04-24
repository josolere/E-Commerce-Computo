import { gql } from "apollo-server";

export const typeDefs = gql`
  # object querys mutations RECORDAR USAR MAYÚSCULAS

  type Order {
    id: Int
    status: String
    details: [OrderDetail]
    createdAt: String
    updatedAt: String
  }

  type Query {
    getOrderById(id: ID!): Order
    getOrderByStatus(status: String): [Order]
    getOrdersByIdUser(idUser: ID!): [Order]
    getAllOrders(status: String): [Order]
  }

  type Mutation {
    createOrder(input: CreateOrderInput, idUser: ID): Order
    deleteOrder(id: ID!): Order
    editOrder(id: ID, input: EditOrderInput): Order
  }

  input CreateOrderInput {
    id: Int
    status: String
  }

  input EditOrderInput {
    status: String
  }
`;
