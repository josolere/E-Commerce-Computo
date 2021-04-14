// Types
import { User, Product, Order, OrderDetail } from "./types";

// User
export interface iUser extends User {
  id: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface iCreateUserInput extends User {}
export interface iEditUserInput extends User {}

//Product
export interface iProduct extends Product {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface iCreateProductInput extends Product {}
export interface iEditProductInput extends Product {}

export interface iFilterProducts {
  name?: String;
  offset?: number;
  limit?: number;
  categoriesId?: [number];
}

//Order
export interface iOrder extends Order {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface iCreateOrderInput extends Order {}
export interface iEditOrderInput extends Order {}

//Order Details
export interface iOrderDetail extends OrderDetail {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface iCreateOrderDetailInput extends Order {}
export interface iEditOrderDetailInput extends Order {}

//Models
export interface iModels {
  Product: any;
  Category: any;
  User: any;
  Order: any;
  OrderDetail: any;
  sequelize: any;
}
