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
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string
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
  confirmAt: Date;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
};
export type OrderDetail = {
  quantity: number;
  price: number;
  productName: string;
};
export type Review = {
  text: string;
  rating: number;
  userId: string;
};

export type PaymentData = {
  transaction_amount: number;
  token: string;
  description: string;
  installments: number;
  payment_method_id: string;
  issuer_id: string;
  payer: Payer;
};

export type PaymentResult = {
  status: string;
};

export type Payer = {
  email: string;
  identification: Identification;
};

export type Identification = {
  type: string;
  number: string;
};

export type Wishlist  = {
  userId:String
  product: Product
}