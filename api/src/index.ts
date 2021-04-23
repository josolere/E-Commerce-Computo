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
<<<<<<< HEAD
  apolloServer.applyMiddleware({ app });
=======
  apolloServer.applyMiddleware({ app, cors:false });
>>>>>>> ba9ea5d80e1f74ec14a56ecfd7f9df8a5d466db0
  app.listen(PORT, () => {
    console.log(`\nRunning Playground on ${PORT}/graphql`);
  });
});
