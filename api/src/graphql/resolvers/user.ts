import {
  iCreateUserInput,
  iEditUserInput,
  iModels,
  iUser,
} from "../../interfaces";
import Sequelize, { Op } from "sequelize";
// import User from "../../models";
import db from "../../models";

export default {
  Query: {
    getUserById: async (
      _parent: object,
      { id }: { id: number },
      { models }: { models: iModels }
    ): Promise<iUser> => {
      const data = await models.User.findByPk(id);
      return data;
    },
  },
  Mutation: {
    createUser: (
      _: any,
      { input }: { input: any },
      { models }: { models: any }
    ): any => models.User.create({ ...input }),
    deleteUser: async (
      _parent: object,
      { id }: { id: string },
      { models }: { models: iModels }
    ): Promise<any> => {
      const UserToRemove = await models.User.findByPk(id);

      if (UserToRemove) {
        await UserToRemove.destroy({ where: { id } });
        return UserToRemove;
      }

      return null;
    },
    editUser: async (
      _parent: object,
      { id, input }: { id: string; input: iEditUserInput },
      { models }: { models: iModels }
    ): Promise<any> => {
      const UserToEdit = await models.User.findByPk(id);

      if (UserToEdit) {
        const updatedUser = await UserToEdit.update(
          { ...input },
          { where: { id } }
        );

        return updatedUser;
      }

      return null;
    },
  },
};
