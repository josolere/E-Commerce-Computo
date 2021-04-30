import { Association, DataTypes, Model, Optional, Sequelize } from "sequelize";

import { Product } from "./Product";
//import { Order } from "./Order";

export interface DiscountCampaignAttributesI {
  id: number;
  name: string;
  type: string;
  discount: number;
  start: string;
  end: string;
}

interface DiscountCampaignCreationAttributesI
  extends Optional<DiscountCampaignAttributesI, "id"> {}

export class DiscountCampaign
  extends Model<
    DiscountCampaignAttributesI,
    DiscountCampaignCreationAttributesI
  >
  implements DiscountCampaignAttributesI {
  public id!: number;
  public name!: string;
  public type!: string;
  public discount!: number;
  public start!: string;
  public end!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    // categories: Association<Product, Category>;
    // orders: Association<Product, Order>;
    products: Association<DiscountCampaign, Product>;
  };
}

export function DiscountCampaignFactory(sequelize: Sequelize) {
  DiscountCampaign.init(
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
      type: {
        type: DataTypes.TEXT,
      },
      discount: {
        type: DataTypes.INTEGER,
      },
      start: {
        type: DataTypes.TEXT,
      },
      end: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "discountCampaign",
      sequelize,
    }
  );
  return DiscountCampaign;
}
