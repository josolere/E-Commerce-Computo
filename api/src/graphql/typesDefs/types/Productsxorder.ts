import { gql } from "apollo-server";

export const typeDefs = gql`
  # object querys mutations RECORDAR USAR MAYÚSCULAS
  type OrderDetail {
    id: ID
    OrderId: Int
    ProductId: Int
    quantity: Int
    price: Float
    productName: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getOrderDetailById(id: ID!): Order
    #getOrderByName(name: String): [Order]
  }

  type Mutation {
    createOrderDetail(idProduct: ID, idOrder: ID, quantity: Int): OrderDetail
    deleteOrderDetail(id: ID!): OrderDetail!
    editOrderDetail(id: ID, input: EditOrderDetailInput): OrderDetail!
  }

  input EditOrderDetailInput {
    id: ID
    OrderId: Int
    ProductId: Int
    quantity: Int
    price: Float
    productName: String
  }
`;
