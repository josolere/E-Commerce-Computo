import { gql } from "apollo-server";

export const typeDefs = gql`
  # object querys mutations RECORDAR USAR MAYÚSCULAS
  type Detail {
    id: ID
    OrderId: Int
    ProductId: Int
    quantity: Int
    price: Float
    productName: String
    discountName: String
    discountType: String
    discount: Int
    discountStart: String
    discountEnd: String
    createdAt: String
    updatedAt: String
  }
  type Order {
    id: Int
    status: String
    details: [Detail]
    confirmAt: String
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
    confirmAt: String
  }
`;
