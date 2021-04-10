// Types
import { User } from "./types";

// User
export interface iUser extends User {
  id: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

//////////////////////////////////////////////////////

//Product
type Product = {
  image: string;
  brand: string;
  price: number;
  details: number;
};

export interface iProduct extends Product {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface iCreateProductInput extends Product {}
//Models
export interface iModels {
  Product: any;
  Category: any;
  sequelize: any;
}
