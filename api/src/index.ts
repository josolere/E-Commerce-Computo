import { sequelize } from "./models/index";
import app from "./app";
import apolloServer from "./apollo";
import { productsSeeder, categoriesSeeder, usersSeeder, productRelationsSeeder} from "./seeders/test";


require("dotenv").config();
const { PORT } = process.env;

const alter = true;
const force = true;
const logging = true;
sequelize.sync({ alter, force, logging }).then(() => {
  if (force) {
    categoriesSeeder();
    productsSeeder()
    usersSeeder()
    setTimeout(() => productRelationsSeeder(), 5000);
    
  }
  apolloServer.applyMiddleware({ app, cors:false });
  app.listen(PORT, () => {
    console.log(`\nRunning Playground on ${PORT}/graphql`);
  });
});
