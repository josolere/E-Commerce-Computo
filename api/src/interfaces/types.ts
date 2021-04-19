import { Category } from "../models/Category";

export type User = {
  username: string | null;
  password: string | null;
  email: string;
  privilege: string;
  active: boolean;
  name: string;
  surname: string;
  address: string | null;
  id:string | undefined;
  facebookId: string | null
};
export type Product = {
  image: string;
  brand: string;
  price: number;
  details: number;
  categories : number[]
};
export type Order = {
  status: string;
};
export type OrderDetail = {
  quantity: number;
  price: number;
};
export type Review = {
  text: string;
  rating: number;
};
