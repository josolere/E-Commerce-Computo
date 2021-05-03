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
  id?: string;
  username?: string | null;
  password?: string | null;
  email?: string;
  privilege?: string;
  active?: boolean;
  name?: string;
  surname?: string;
  address?: string | null; //puede ser otra tabla
  facebookId?: string | null;
  googleId?: string | null;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string
}

interface UserCreationAttributesI extends Optional<UserAttributesI, "id" | "address" | "username" | "password" | "facebookId"> {}

export class User
  extends Model<UserAttributesI, UserCreationAttributesI>
  implements UserAttributesI {
  public id!: string;
  public username!: string | null;
  public password!: string | null;
  public email!: string;
  public privilege!: string;
  public active!: boolean;
  public name!: string;
  public surname!: string;
  public address!: string | null;
  public facebookId!:string | null;
  public googleId!: string | null;
  public street!: string;
  public city!: string;
  public state!: string;
  public zip!: string;
  public phone!: string
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
        type: DataTypes.STRING,
        allowNull:false,
        primaryKey: true,
      },
      facebookId:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      googleId:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: true,
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
        allowNull: true,
      },
      // datos del domicilio
      street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "Users",
      sequelize,
    }
  );
  return User;
}
