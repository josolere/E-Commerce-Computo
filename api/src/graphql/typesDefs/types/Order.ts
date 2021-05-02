import { gql } from "apollo-server";

export const typeDefs = gql`
  # object querys mutations RECORDAR USAR MAYÚSCULAS
  type Order {
    id: Int
    status: String
    details: [OrderDetail]
    confirmAt: String
    street: String
    city: String
    state: String
    zip: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getOrderById(id: ID!): Order
    getOrderByStatus(status: String, idUser: ID): [Order]
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
    street: String
    city: String
    state: String
    zip: String
  }

  input EditOrderInput {
    status: String
    confirmAt: String
    street: String
    city: String
    state: String
    zip: String
  }
`;
