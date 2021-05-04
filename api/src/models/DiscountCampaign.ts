import { Association, DataTypes, Model, Optional, Sequelize } from "sequelize";

import { Product } from "./Product";

export interface DiscountCampaignAttributesI {
  id: number;
  name: string;
  type: string;
  discount: string;
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
  public discount!: string;
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
      },
      discount: {
        type: DataTypes.STRING,
      },
      start: {
        type: DataTypes.STRING,
      },
      end: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "discountCampaign",
      sequelize,
    }
  );
  return DiscountCampaign;
}
