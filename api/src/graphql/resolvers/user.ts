import {
  iCreateUserInput,
  iSignUpInput,
  iEditUserInput,
  iModels,
  iUser,
} from "../../interfaces";
import Sequelize, { Op } from "sequelize";
import User from "../../models";
import db from "../../models";
import {v4 as uuid} from 'uuid'

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
    currentUser: (parent:object, args:any, context:any) => context.user,
    
    
    getUsers: async(
      _parent: object,
      args:any,
      { models }: { models: iModels}
    ): Promise<any> => {
      const users = await db.User.findAll()  //vaya a saber por qué no anda con models o User, así funcó
      return users;
    }
    
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
    logout:(parent:object, args:any, context:any) => context.logout(),


    //llamamos a la funcion authenticate que está en el contexto. le pasamos el nombre de la estrategia que vamos a usar
    //(graphql-local), y las credenciales que podemos leer de las variables de la mutación. Para crear una sesión persistente,
    //passport necesita que llamemos a la funcion login después de autenticar.
    login: async(
      _parent: object,
      { email, password}: { email: string, password: string},
      context: any ) =>{
        const { user } = await context.authenticate('graphql-local', { email, password });
        await context.login(user);
        return { user }
      },
    

    signup: async (
    _parent: object,
    {input }: { input: iSignUpInput},
    context: any,
    ): Promise<any> => {
      const existingUsers = await db.User.findAll();
      const userWithEmailAlreadyExists = !!existingUsers.find((user:any) => user.dataValues.email === input.email)

      if(userWithEmailAlreadyExists){
        throw new Error('User with email already exists');
      }

      let newUser = await db.User.create({ ...input })

      await context.login(newUser);

      return {user: newUser}
    },
  },
};
