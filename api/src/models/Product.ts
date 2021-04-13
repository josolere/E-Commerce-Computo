import { Association ,DataTypes, Model, Optional, Sequelize ,
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
} from 'sequelize';

import { Category } from './Category'

export interface ProductAttributesI {
    id:number;
    name:string;
    image:string;
    brand:string;
    price:number;
    details:string;
}

interface ProductCreationAttributesI extends Optional<ProductAttributesI, "id"> {}

export class Product extends Model<ProductAttributesI, ProductCreationAttributesI>
    implements ProductAttributesI {
        public id!: number;
        public name!:string;
        public image!:string;
        public brand!:string;
        public price!:number;
        public details!:string;
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

        public readonly categories?: Category[];

        public static associations: {
            categories: Association<Product,Category>
        }
}

export function  ProductFactory(sequelize: Sequelize){
    Product.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        image: {
            type: DataTypes.TEXT,
        },
        brand: {
            type: DataTypes.STRING,
        },
        price : {
            type : DataTypes.DECIMAL(18,2),
        },
        details : {
            type : DataTypes.TEXT,
        }
    },{ 
        tableName : 'products',
        sequelize
     });
     return Product;

}
