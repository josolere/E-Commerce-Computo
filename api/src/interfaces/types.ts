import { Category } from "../models/Category";

export type User = {
  username: string;
  password: string;
  email: string;
  privilege: string;
  active: boolean;
  name: string;
  surname: string;
  address: string;
  id: string;
  facebookId: string;
};
export type Product = {
  image: string;
  brand: string;
  price: number;
  details: number;
  categories: number[];
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
