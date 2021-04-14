import { Association ,DataTypes, Model, Optional, Sequelize ,
    // Belongs to many Model
} from 'sequelize';

import { OrderDetail } from './OrderDetail'

export interface OrderAttributesI {
    id:number;
    status:String[];
}

interface OrderCreationAttributesI extends Optional<OrderAttributesI, "id"> {}

export class Order extends Model<OrderAttributesI, OrderCreationAttributesI>
    implements OrderAttributesI {
        id!:number;
        status!:String[];
        public readonly createdAt!:Date;
        public readonly updatedAt!:Date;
}

export function  OrderFactory(sequelize: Sequelize){
    Order.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        status: {
            type: DataTypes.STRING,
        }
    },{ 
        tableName : 'orders',
        sequelize
     });
     return Order;

}
