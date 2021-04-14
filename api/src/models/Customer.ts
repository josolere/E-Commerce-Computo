import { Association ,DataTypes, Model, Optional, Sequelize ,
    // Belongs to many Model
} from 'sequelize';

//import { OrderDetail } from './OrderDetail'

export interface CustomerAttributesI {
    id:number;
    name:string;
    address:string;
    city:string;
    state:string;
    country:string;
    zipCode:string;
}

interface CustomerCreationAttributesI extends Optional<CustomerAttributesI, "id"> {}

export class Customer extends Model<CustomerAttributesI, CustomerCreationAttributesI>
    implements CustomerAttributesI {
        id!:number;
        name!:string;
        address!:string;
        city!:string;
        state!:string;
        country!:string;
        zipCode!:string;
        public readonly createdAt!:Date;
        public readonly updatedAt!:Date;
}

export function  CustomerFactory(sequelize: Sequelize){
    Customer.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        city:{
            type: DataTypes.STRING,
        },
        state:{
            type: DataTypes.STRING,
        },
        country:{
            type: DataTypes.STRING,
        },
        zipCode:{
            type: DataTypes.STRING,
        }
    },{ 
        tableName : 'customers',
        sequelize
     });
     return Customer;

}
