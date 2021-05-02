import {
  Association,
  DataTypes,
  EnumDataType,
  Model,
  Optional,
  Sequelize,
  BelongsToManyGetAssociationsMixin,
} from "sequelize";

import { OrderDetail } from "./OrderDetail";

export interface OrderAttributesI {
  id: number;
  status: string;
  confirmAt: Date;
  // status: EnumDataType<string>;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

interface OrderCreationAttributesI extends Optional<OrderAttributesI, "id"> {}

export class Order
  extends Model<OrderAttributesI, OrderCreationAttributesI>
  implements OrderAttributesI {
  public id!: number;
  public status!: string;
  public confirmAt!: Date;
  // public status!: EnumDataType<string>;
  public street!: string;
  public city!: string;
  public state!: string;
  public zip!: string;
  public phone!: string;
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
      confirmAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      street: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      zip: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "orders",
      sequelize,
    }
  );
  return Order;
}
