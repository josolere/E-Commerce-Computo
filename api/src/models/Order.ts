import {
  Association,
  DataTypes,
  EnumDataType,
  Model,
  Optional,
  Sequelize,
  BelongsToManyGetAssociationsMixin
} from "sequelize";

import { OrderDetail } from "./OrderDetail";

export interface OrderAttributesI {
  id: number;
  status: string;
  // status: EnumDataType<string>;
}

interface OrderCreationAttributesI extends Optional<OrderAttributesI, "id"> {}

export class Order
  extends Model<OrderAttributesI, OrderCreationAttributesI>
  implements OrderAttributesI {
  public id!: number;
  public status!: string;
  // public status!: EnumDataType<string>;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getOrderDetails!: BelongsToManyGetAssociationsMixin<OrderDetail>;

  public readonly orderDetail?: OrderDetail[];

  public static associations: {
    orderDetail: Association<Order, OrderDetail>;
  };
}

export function OrderFactory(sequelize: Sequelize) {
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING,
        // type: DataTypes.ENUM("CANCELLED", "PROCESSING", "COMPLETE"),
        allowNull: true,
      },
    },
    {
      tableName: "orders",
      sequelize,
    }
  );
  return Order;
}
