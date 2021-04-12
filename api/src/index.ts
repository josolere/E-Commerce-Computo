import { sequelize } from "./models/index";
import app from "./app";
import apolloServer from "./apollo";
<<<<<<< HEAD
import { productsSeeder } from './seeders/test'
=======
import { productsSeeder } from "./seeders/test";
>>>>>>> 9311e295c0b36c2172f20363dd8e643215661752

require("dotenv").config();
const { PORT } = process.env;

const alter = true;
const force = true;
<<<<<<< HEAD
sequelize.sync({ alter, force }).then(() => {

 if(force){
    productsSeeder();

  } 
=======
const logging = true;
sequelize.sync({ alter, force, logging }).then(() => {
  if (force) {
    productsSeeder()
  }
>>>>>>> 9311e295c0b36c2172f20363dd8e643215661752
  apolloServer.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log(`\nRunning Playground on ${PORT}/graphql`);
  });
});
