import { sequelize } from "./models/index";
import app from "./app";
import apolloServer from "./apollo";
import { productsSeeder, categoriesSeeder, usersSeeder} from "./seeders/test";


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
  }
  apolloServer.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log(`\nRunning Playground on ${PORT}/graphql`);
  });
});
