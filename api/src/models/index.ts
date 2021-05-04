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
import {
  DiscountCampaignFactory,
  DiscountCampaign as DiscountCampaignClass,
} from "./DiscountCampaign";

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
  DiscountCampaign: typeof DiscountCampaignClass;
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
const DiscountCampaign = DiscountCampaignFactory(sequelize);

//los productos tienen muchas categorias y las categorias tienen muchos productos
Product.belongsToMany(Category, { through: "productsxcategories" });
Category.belongsToMany(Product, { through: "productsxcategories" });

//los detalles tienen muchos productos y cada producto puede estar en muchos detalles
Order.belongsToMany(Product, { through: Productsxorder });
Product.belongsToMany(Order, { through: Productsxorder });

//cada pedido pertenece a un usuario, y un usuario puede tener muchos pedidos
Order.belongsTo(User, { targetKey: "id" });
User.hasMany(Order, { sourceKey: "id" });

//los productos tienen muchas categorias y las categorias tienen muchos productos
Product.belongsToMany(User, { through: "wishlist" });
User.belongsToMany(Product, { through: "wishlist" });

Review.belongsTo(Product, { as: "product" });
Product.hasMany(Review, { as: "reviews" });
Review.belongsTo(User, { as: "users" });
User.hasMany(Review, { as: "reviews" });

// compatibilidad entre productos
Product.belongsToMany(Product, {
  as: "productCompatibility",
  through: "productTree",
});

// campaña de descuento de productos
DiscountCampaign.belongsToMany(Product, {
  through: "discountCampaignxproduct",
});
Product.belongsToMany(DiscountCampaign, {
  through: "discountCampaignxproduct",
});

const db: DB = {
  sequelize,
  Product,
  Category,
  User,
  Order,
  Review,
  Productsxorder,
  DiscountCampaign,
};

export default db;
