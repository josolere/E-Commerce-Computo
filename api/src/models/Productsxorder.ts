import {
  Association,
  DataTypes,
  Model,
  Optional,
  Sequelize,
  // Belongs to many Model
} from "sequelize";

// import { OrderDetail } from "./OrderDetail";

export interface ProductsxorderAttributesI {
  id: number;
  quantity: number;
  price: number;
  productName: string;
}

interface ProductsxorderCreationAttributesI
  extends Optional<ProductsxorderAttributesI, "id"> {}

export class Productsxorder
  extends Model<ProductsxorderAttributesI, ProductsxorderCreationAttributesI>
  implements ProductsxorderAttributesI {
  public id!: number;
  public quantity!: number;
  public price!: number;
  public productName!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function ProductsxorderFactory(sequelize: Sequelize) {
  Productsxorder.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      productName: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "productsxorder",
      sequelize,
    }
  );
  return Productsxorder;
}
