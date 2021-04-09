import { sequelize } from "./models/index";
import app from "./app";
import apolloServer from "./apollo";

require("dotenv").config();
const { PORT } = process.env;

const alter = true;
const force = false;
sequelize.sync({ alter, force }).then(() => {
  apolloServer.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log(`\nRunning Playground on ${PORT}/graphql`);
  });
});
