import { Sequelize } from "sequelize";

import { CategoryFactory, Category as CategoryClass } from "./Category";
import { ProductFactory, Product as ProductClass } from "./Product";
import { UserFactory, User as UserClass } from "./User";

import dotenv from "dotenv";
dotenv.config();

export interface DB {
  sequelize: Sequelize;
  Product: typeof ProductClass;
  Category: typeof CategoryClass;
  User: typeof UserClass;
}

const { DB_NAME, DB_PORT, DB_PASSWORD, DB_URL, DB_USER } = process.env;

export const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_URL}:${DB_PORT}/${DB_NAME}`
);

const Product = ProductFactory(sequelize);
const Category = CategoryFactory(sequelize);
const User = UserFactory(sequelize);

Product.belongsToMany(Category, { through: "productsxcategories" });
Category.belongsToMany(Product, { through: "productsxcategories" });

const db: DB = {
  sequelize,
  Product,
  Category,
  User,
};

export default db;
