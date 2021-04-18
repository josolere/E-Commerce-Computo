import { gql } from "apollo-server";

export const typeDefs = gql`
  # object querys mutations RECORDAR USAR MAYÚSCULAS
  type OrderDetail {
    id: Int
    OrderId: Int
    ProductId: Int
    quantity: Int
    price: Float
    createdAt: String
    updatedAt: String
  }

  type Query {
    getOrderDetailById(id: ID!): Order
    #getOrderByName(name: String): [Order]
  }

  type Mutation {
    createOrderDetail(idProduct: ID, idOrder: ID, quantity: Int): OrderDetail
    #deleteOrderDetail(id: String!): Order!
    #editOrderDetail(id: String, input: EditOrderDetailInput): Order!
  }

  input EditOrderDetailInput {
    id: Int
    quantity: Int
    price: Float
  }
`;
