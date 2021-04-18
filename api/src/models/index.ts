import { Sequelize } from "sequelize";

import { CategoryFactory, Category as CategoryClass } from "./Category";
import { ProductFactory, Product as ProductClass } from "./Product";
import { UserFactory, User as UserClass } from "./User";
import { OrderFactory, Order as OrderClass } from "./Order";
import { ReviewFactory, Review as ReviewClass } from "./Review";
import {
  ProductsxorderFactory,
  Productsxorder as ProductsxorderClass,
} from "./Productsxorder";

import dotenv from "dotenv";
dotenv.config();

export interface DB {
  sequelize: Sequelize;
  Product: typeof ProductClass;
  Category: typeof CategoryClass;
  User: typeof UserClass;
  Order: typeof OrderClass;
  Review: typeof ReviewClass;
  Productsxorder: typeof ProductsxorderClass;
}

const { DB_NAME, DB_PORT, DB_PASSWORD, DB_URL, DB_USER } = process.env;

export const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_URL}:${DB_PORT}/${DB_NAME}`
);

const Product = ProductFactory(sequelize);
const Category = CategoryFactory(sequelize);
const User = UserFactory(sequelize);
const Order = OrderFactory(sequelize);
const Review = ReviewFactory(sequelize);
const Productsxorder = ProductsxorderFactory(sequelize);

//los productos tienen muchas categorias y las categorias tienen muchos productos
Product.belongsToMany(Category, { through: "productsxcategories", as: 'categories'});
Category.belongsToMany(Product, { through: "productsxcategories" });

//los detalles tienen muchos productos y cada producto puede estar en muchos detalles
Order.belongsToMany(Product, { through: Productsxorder });
Product.belongsToMany(Order, { through: Productsxorder });

//cada pedido pertenece a un usuario, y un usuario puede tener muchos pedidos
Order.belongsTo(User, { targetKey: "id" });
User.hasMany(Order, { sourceKey: "id" });

Review.belongsTo(Product, { as: "product" });
Product.hasMany(Review, { as: "reviews" });

const db: DB = {
  sequelize,
  Product,
  Category,
  User,
  Order,
  Review,
  Productsxorder,
};

export default db;
