import {
  Association,
  DataTypes,
  Model,
  Optional,
  Sequelize,
  // Belongs to many Model
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
} from "sequelize";

import { Category } from "./Category";
import { Order } from "./Order";

export interface ProductAttributesI {
  id: number;
  name: string;
  image: string;
  brand: string;
  price: number;
  details: string;
  // categoriesId: number;
  stock: number;
}

interface ProductCreationAttributesI
  extends Optional<ProductAttributesI, "id"> {}

export class Product
  extends Model<ProductAttributesI, ProductCreationAttributesI>
  implements ProductAttributesI {
  public id!: number;
  public name!: string;
  public image!: string;
  public brand!: string;
  public price!: number;
  public details!: string;
  // public categoriesId!: number;
  public stock!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getCategories!: BelongsToManyGetAssociationsMixin<Category>;
  public addCategory!: BelongsToManyAddAssociationMixin<Category, number>;
  public addCategories!: BelongsToManyAddAssociationsMixin<Category, number>;
  public hasCategory!: BelongsToManyHasAssociationMixin<Category, number>;
  public hasCategories!: BelongsToManyHasAssociationsMixin<Category[], number>;
  public countCategories!: BelongsToManyCountAssociationsMixin;
  public removeCategory!: BelongsToManyRemoveAssociationMixin<Category, number>;
  public removeCategories!: BelongsToManyRemoveAssociationsMixin<
    Category[],
    number
  >;
  public setCategories!: BelongsToManySetAssociationsMixin<Category[], number>;
  public createCategory!: BelongsToManyCreateAssociationMixin<Category>;
  public getProducts!: BelongsToManyGetAssociationsMixin<Product[]>

  public readonly categories?: Category[];
  public readonly orders?: Order[];

  public static associations: {
    categories: Association<Product, Category>;
    orders: Association<Product, Order>;
    products: Association<Product, Product>;
  };
}

export function ProductFactory(sequelize: Sequelize) {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
      },
      brand: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL(18, 2),
      },
      details: {
        type: DataTypes.TEXT,
      },
      // categoriesId: {
      //   type: DataTypes.INTEGER,
      // },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "products",
      sequelize,
    }
  );
  return Product;
}
