// Types
import { User, Product } from "./types";

// User
export interface iUser extends User {
  id: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

//Product
export interface iProduct extends Product {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface iCreateProductInput extends Product {
  categories: Array<number>
}
export interface iEditProductInput extends Product {}

//Models
export interface iModels {
  Product: any;
  Category: any;
  sequelize: any;
}
