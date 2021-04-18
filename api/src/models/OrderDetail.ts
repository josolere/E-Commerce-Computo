import {
  Association,
  DataTypes,
  Model,
  Optional,
  Sequelize,
  // Belongs to many Model
} from "sequelize";

//import { Category } from './Category'

export interface OrderDetailAttributesI {
  id: number;
  quantity: number;
  price: number;
}

interface OrderDetailCreationAttributesI
  extends Optional<OrderDetailAttributesI, "id"> {}

export class OrderDetail
  extends Model<OrderDetailAttributesI, OrderDetailCreationAttributesI>
  implements OrderDetailAttributesI {
  public id!: number;
  public quantity!: number;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function OrderDetailFactory(sequelize: Sequelize) {
  OrderDetail.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.FLOAT,
      },
      price: {
        type: DataTypes.FLOAT,
      },
    },
    {
      tableName: "orderdetails",
      sequelize,
    }
  );
  return OrderDetail;
}
