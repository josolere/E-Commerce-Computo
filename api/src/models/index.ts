import {Sequelize} from 'sequelize'

import {CategoryFactory, Category as CategoryClass} from './Category'
import {ProductFactory, Product as ProductClass} from './Product'
import {ReviewFactory, Review as ReviewClass} from './Review'

import dotenv from 'dotenv';
dotenv.config();

export interface DB {
    sequelize : Sequelize,
    Product: typeof ProductClass,
    Category: typeof CategoryClass,
    Review: typeof ReviewClass,
} 

const {DB_NAME, DB_PORT, DB_PASSWORD, DB_URL, DB_USER} = process.env

export const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_URL}:${DB_PORT}/${DB_NAME}`
)

const Product = ProductFactory(sequelize);
const Category = CategoryFactory(sequelize);
const Review = ReviewFactory(sequelize);

Product.belongsToMany(Category,{through: 'productsxcategories'});
Category.belongsToMany(Product,{through: 'productsxcategories'})
Review.belongsTo(Product, {as: 'product'})
Product.hasMany(Review, { as: 'reviews'})

const db : DB = {
    sequelize,
    Product,
    Category,
    Review,
};

export default db;