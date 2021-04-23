import { Association ,DataTypes, Model, Optional, Sequelize,
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
    BelongsToManyCreateAssociationMixin } from 'sequelize';

import { Product } from "./Product"


export interface CategoryAttributesI {
    id:number;
    name:string;
}

interface CategoryCreationAttributesI extends Optional<CategoryAttributesI, "id"> {}

export class Category extends Model<CategoryAttributesI, CategoryCreationAttributesI>
    implements CategoryAttributesI {
        public id!: number;
        public name!:string;
        public readonly createdAt!:Date;
        public readonly updatedAt!:Date;
        
        public getProducts!: BelongsToManyGetAssociationsMixin<Product>
        public addProduct!: BelongsToManyAddAssociationMixin<Product, number>
        public addProductes!: BelongsToManyAddAssociationsMixin<Product, number>
        public hasProduct!: BelongsToManyHasAssociationMixin<Product, number>
        public hasProducts!: BelongsToManyHasAssociationsMixin<Product[], number>
        public countProducts!:BelongsToManyCountAssociationsMixin;
        public removeProduct!: BelongsToManyRemoveAssociationMixin<Product, number>
        public removeProducts!: BelongsToManyRemoveAssociationsMixin<Product[], number>
        public setProducts!: BelongsToManySetAssociationsMixin<Product[], number>
        public createProduct!: BelongsToManyCreateAssociationMixin<Product>

        public readonly products?: Product[];

        public static associations: {
            products: Association<Category,Product>
        }
}

export function  CategoryFactory(sequelize: Sequelize){
    Category.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false,
        }
    },{ 
        tableName : 'categories',
        sequelize
     });
     return Category;

}