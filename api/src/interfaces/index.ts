// Types
import { Review } from "../models/Review";
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
  categories: Array<any>;
}
export interface iEditProductInput extends Product {}

export interface iAddReviewInput extends Review {}

//Models
export interface iModels {
  Product: any;
  Category: any;
  sequelize: any;
}

export interface iFilterProducts {
  name?: String;
  offset?: number;
  limit?: number;
  categoriesId?: [number];
}
