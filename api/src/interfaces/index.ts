// Types
import { User, Product } from "./types";

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

//Models
export interface iModels {
  Product: any;
  Category: any;
  User: any;
  sequelize: any;
}

export interface iFilterProducts {
  name?: String;
  offset?: number;
  limit?: number;
  categoriesId?: [number];
}
