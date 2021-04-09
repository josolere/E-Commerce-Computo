import { ApolloServer, makeExecutableSchema } from "apollo-server-express";

// Models
import models from "./models";

// Type Definitions & Resolvers
import resolvers from "./graphql/resolvers";
import { typeDefs } from "./graphql/typesDefs";

// Schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Apollo Server
const apolloServer = new ApolloServer({
  schema,
  context: {
    models,
  },
});

export default apolloServer;
