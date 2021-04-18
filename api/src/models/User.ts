import {
  Association,
  DataTypes,
  Model,
  Optional,
  Sequelize,
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
} from "sequelize";

import { Product } from "./Product";

export interface UserAttributesI {
  id: number;
  username: string;
  password: string;
  email: string;
  privilege: string;
  active: boolean;
  name: string;
  surname: string;
  address: string; //puede ser otra tabla
}

interface UserCreationAttributesI extends Optional<UserAttributesI, "id"> {}

export class User
  extends Model<UserAttributesI, UserCreationAttributesI>
  implements UserAttributesI {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public privilege!: string;
  public active!: boolean;
  public name!: string;
  public surname!: string;
  public address!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /* 
  public getUsers!: BelongsToManyGetAssociationsMixin<User>;
  public addUser!: BelongsToManyAddAssociationMixin<User, number>;
  public addUsers!: BelongsToManyAddAssociationsMixin<User, number>;
  public hasUser!: BelongsToManyHasAssociationMixin<User, number>;
  public hasUsers!: BelongsToManyHasAssociationsMixin<User[], number>;
  public countUsers!: BelongsToManyCountAssociationsMixin;
  public removeUser!: BelongsToManyRemoveAssociationMixin<User, number>;
  public removeUsers!: BelongsToManyRemoveAssociationsMixin<User[], number>;
  public setUsers!: BelongsToManySetAssociationsMixin<User[], number>;
  public createUser!: BelongsToManyCreateAssociationMixin<User>; 
  
  public readonly products?: Product[];
  
  public static associations: {
    products: Association<User, Product>;
  };
  */
}

export function UserFactory(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      privilege: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Users",
      sequelize,
    }
  );
  return User;
}
