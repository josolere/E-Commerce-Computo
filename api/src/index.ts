import { sequelize } from "./models/index";
import app from "./app";
import apolloServer from "./apollo";
import { productsSeeder, categoriesSeeder, usersSeeder} from "./seeders/test";


require("dotenv").config();
const { PORT } = process.env;

const alter = false;
const force = false;
const logging = false;
sequelize.sync({ alter, force, logging }).then(() => {
  if (force) {
    categoriesSeeder();
    productsSeeder()
    usersSeeder()
  }
  apolloServer.applyMiddleware({ app, cors:false });
  app.listen(PORT, () => {
    console.log(`\nRunning Playground on ${PORT}/graphql`);
  });
});
