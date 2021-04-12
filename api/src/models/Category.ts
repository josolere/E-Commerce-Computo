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
        
        public getCategories!: BelongsToManyGetAssociationsMixin<Category>
        public addCategory!: BelongsToManyAddAssociationMixin<Category, number>
        public addCategories!: BelongsToManyAddAssociationsMixin<Category, number>
        public hasCategory!: BelongsToManyHasAssociationMixin<Category, number>
        public hasCategories!: BelongsToManyHasAssociationsMixin<Category[], number>
        public countCategories!:BelongsToManyCountAssociationsMixin;
        public removeCategory!: BelongsToManyRemoveAssociationMixin<Category, number>
        public removeCategories!: BelongsToManyRemoveAssociationsMixin<Category[], number>
        public setCategories!: BelongsToManySetAssociationsMixin<Category[], number>
        public createCategory!: BelongsToManyCreateAssociationMixin<Category>

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