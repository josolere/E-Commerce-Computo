import {
  // iCreateUserInput,
  iSignUpInput,
  iEditUserInput,
  iModels,
  iUser,
} from "../../interfaces";
// import Sequelize, { Op } from "sequelize";
// import User from "../../models";
import db from "../../models";
import { v4 as uuid } from "uuid";
import bcrypt from 'bcrypt'
import { forEachTrailingCommentRange } from "typescript";
const saltRounds = 10;

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

    currentUser: (_parent: object, _args: any, context: any) =>{
    let user = context.getUser()
     
    console.log(user)
    return user
    },

    getUsers: async (
      _parent: object,
      _args: object,
      { models }: { models: iModels }
    ): Promise<any> => {
      const users = await models.User.findAll();
      return users;
    },
    getWishList: async (
      _parent: object,
      { userId }: { userId:string },
      { models }: { models: iModels }
    ): Promise<any> => {

    const options = {
        include: [{model: db.Product,
        through: "wishlist",
        attributes: ["id", "name"]}]
    };
     const user = await models.User.findByPk(userId,options);

     return user.dataValues.Products
    },  
  },
  Mutation: {
    toggleWishlist: async (
      _parent: object,
      { productId, userId }: { productId: number, userId:string },
      { models }: { models: iModels }
    ): Promise<any> => {
      // busco si este usuario tiene ese producto entre sus favoritos
      // si existe lo elimino y devuelvo el array 
      // si no existo agrego el producto y devuelvo el array

      const options = {
        include: [{model: db.Product,
          through: "wishlist",
          attributes: ["id", "name"]}]
    };

    const user = await models.User.findByPk(userId,options);

      let insert = 1;
      for(let x = 0; x< user.dataValues.Products.length; x++){
        if(Number(user.dataValues.Products[x].id)===Number(productId)){
          await user.removeProduct(productId);
          insert = 0;
        }
      }

      if(insert>0) {
        await user.addProduct(productId);
      }

      const userOut = await models.User.findByPk(userId,options);
      return userOut.dataValues.Products
    },

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

        if(input.password){

        const passMatch = await bcrypt.compare(input.password, UserToEdit.password);
        console.log('matcheaONoMatchea',passMatch)
        const emailMatch = input.email === UserToEdit.email

        if(!emailMatch){
          throw new Error('Email does not match')
        }
  
        if(passMatch && emailMatch) {
          
          bcrypt.hash(input.password, saltRounds, function(err, hash){
            models.User.update({password: hash},{ 
              where:{ 
                id: id
              }
             })
          })
          
          return updatedUser;

          }else{
            throw new Error("Passwords doesn't match")
          }
        }

        return updatedUser;
      }

      return null;
    },

    logout: (parent: object, args: any, context: any) => context.logout(),

    //llamamos a la funcion authenticate que está en el contexto. le pasamos el nombre de la estrategia que vamos a usar
    //(graphql-local), y las credenciales que podemos leer de las variables de la mutación. Para crear una sesión persistente,
    //passport necesita que llamemos a la funcion login después de autenticar.
    login: async (
      _parent: object,
      { email, password }: { email: string; password: string },
      context: any
    ) => {
      const { user } = await context.authenticate("graphql-local", {
        email,
        password,
      });
      await context.login(user);
      return { user };
    },

    signup: async (
      _parent: object,
      { firstName, lastName, email, password, address, username, street, city, state, zip, phone }: any,
      context: any
    ): Promise<any> => {
      const existingUsers = await context.models.User.findAll();
      const userWithEmailAlreadyExists = !!existingUsers.find(
        (user: any) => user.email === email
      );

      if (userWithEmailAlreadyExists) {
        throw new Error("Ya existe un usuario con ese E-Mail");
      }

      // console.log(input);
      

      let newUserInput: any = {
        id: uuid(),
        name: firstName,
        surname: lastName,
        email: email,
        privilege: "user",
        active: true,
        password: null,
        address: address,
        username: username,
        street, 
        city,
        state, 
        zip, 
        phone
      };

      // console.log(newUserInput);
      let newUser = await context.models.User.create(
        newUserInput,
      );

      bcrypt.hash(password, saltRounds, function(err, hash){
        context.models.User.update({password: hash},{ 
          where:{ 
            email: email
          }
         })
      })

      //console.log(context)

      await context.login(newUser);

      return { user: newUser };
    },
  },
};