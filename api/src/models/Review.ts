import { Association, DataTypes, Model, Optional, Sequelize,
    //BelongsToOne Model,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToCreateAssociationMixin,
} from 'sequelize';


import { Product } from './Product';
import { User } from './User';

export interface ReviewAttributesI {
    id:number;
    text:string;
    rating:number;
    userId: string;
}

export interface ReviewCreationAttributesI extends Optional<ReviewAttributesI, 'id'> {}

export class Review extends Model<ReviewAttributesI, ReviewCreationAttributesI>
    implements ReviewAttributesI{
        public id!: number;
        public text!: string;
        public rating!: number;
        public userId!: string;
        public readonly createdAt!:Date;
        public readonly updatedAt!:Date;

        public getReviews!: BelongsToGetAssociationMixin<Review>
        public setReview!: BelongsToSetAssociationMixin<Review[], number>
        public createReview!: BelongsToCreateAssociationMixin<Review>

        public readonly product?: Product;

        public static associations:{
            product: Association<Review, Product>
            user: Association<Review, User>
        }

    }


    export function ReviewFactory(sequelize: Sequelize){
        Review.init({ 
            id:{
                type: DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey: true,
            },
            userId:{
                type: DataTypes.STRING,

            },
            text:{
                type: DataTypes.TEXT,
            },
            rating:{
                type: DataTypes.INTEGER,
            }

        },{
            tableName: 'reviews',
            sequelize
        });
        return Review;
    }