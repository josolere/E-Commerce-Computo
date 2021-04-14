import {Sequelize} from 'sequelize'

import {CategoryFactory, Category as CategoryClass} from './Category'
import {ProductFactory, Product as ProductClass} from './Product'
import {OrderFactory, Order as OrderClass} from './Order'
import {OrderDetailFactory, OrderDetail as OrderDetailClass} from './OrderDetail'
import {CustomerFactory, Customer as CustomerClass} from './Customer'

import dotenv from 'dotenv';
dotenv.config();

export interface DB {
    sequelize : Sequelize,
    Product: typeof ProductClass,
    Category: typeof CategoryClass,
    Order: typeof OrderClass,
    OrderDetail: typeof OrderDetailClass
    Customer: typeof CustomerClass,
} 

const {DB_NAME, DB_PORT, DB_PASSWORD, DB_URL, DB_USER} = process.env

export const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_URL}:${DB_PORT}/${DB_NAME}`
)

const Product = ProductFactory(sequelize);
const Category = CategoryFactory(sequelize);
const Order = OrderFactory(sequelize)
const OrderDetail = OrderDetailFactory(sequelize)
const Customer = CustomerFactory(sequelize)

Product.belongsToMany(Category,{through: 'productsxcategories'});
Category.belongsToMany(Product,{through: 'productsxcategories'})

OrderDetail.belongsTo(Order, {targetKey: "id"})
Order.hasOne(OrderDetail,{sourceKey: "id"})

OrderDetail.belongsTo(Product, {targetKey: "id"})
Product.hasOne(OrderDetail,{sourceKey: "id"})

Order.belongsTo(Customer,{targetKey: "id"})
Customer.hasOne(Order,{sourceKey: "id"})

const db : DB = {
    sequelize,
    Product,
    Category,
    Order,
    OrderDetail,
    Customer
};

export default db;