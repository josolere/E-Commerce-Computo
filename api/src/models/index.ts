import { Sequelize } from "sequelize";

import { CategoryFactory, Category as CategoryClass } from "./Category";
import { ProductFactory, Product as ProductClass } from "./Product";
import { UserFactory, User as UserClass } from "./User";
import { OrderFactory, Order as OrderClass } from "./Order";
import {
  OrderDetailFactory,
  OrderDetail as OrderDetailClass,
} from "./OrderDetail";

import dotenv from "dotenv";
dotenv.config();

export interface DB {
  sequelize: Sequelize;
  Product: typeof ProductClass;
  Category: typeof CategoryClass;
  User: typeof UserClass;
  Order: typeof OrderClass;
  OrderDetail: typeof OrderDetailClass;
}

const { DB_NAME, DB_PORT, DB_PASSWORD, DB_URL, DB_USER } = process.env;

export const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_URL}:${DB_PORT}/${DB_NAME}`
);

const Product = ProductFactory(sequelize);
const Category = CategoryFactory(sequelize);
const User = UserFactory(sequelize);
const Order = OrderFactory(sequelize);
const OrderDetail = OrderDetailFactory(sequelize);

//los productos tienen muchas categorias y las categorias tienen muchos productos
Product.belongsToMany(Category, { through: "productsxcategories" });
Category.belongsToMany(Product, { through: "productsxcategories" });

//cada detalle esta asociado a un pedido
OrderDetail.belongsTo(Order, { targetKey: "id" });
Order.hasMany(OrderDetail, { sourceKey: "id" });

//los detalles tienen muchos productos y cada producto puede estar en muchos detalles
OrderDetail.belongsToMany(Product, { through: "productsxorder" });
Product.belongsToMany(OrderDetail, { through: "productsxorder" });
// OrderDetail.belongsTo(Product, {targetKey: "id"})
// Product.hasOne(OrderDetail,{sourceKey: "id"})

//cada pedido pertenece a un usuario, y un usuario puede tener muchos pedidos
Order.belongsTo(User, { targetKey: "id" });
User.hasMany(Order, { sourceKey: "id" });

const db: DB = {
  sequelize,
  Product,
  Category,
  User,
  Order,
  OrderDetail,
};

export default db;
