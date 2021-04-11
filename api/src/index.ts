import { sequelize } from "./models/index";
import app from "./app";
import apolloServer from "./apollo";
import { productsSeeder } from './seeders/test'

require("dotenv").config();
const { PORT } = process.env;

const alter = true;
const force = true;
sequelize.sync({ alter, force }).then(() => {

 if(force){
    productsSeeder();

  } 
  apolloServer.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log(`\nRunning Playground on ${PORT}/graphql`);
  });
});
