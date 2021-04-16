import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { GraphQLLocalStrategy, buildContext  } from "graphql-passport"

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
//Preparamos el contexto de GraphQL para hacer las funciones de passport accesibles desde los resolvers
//buildContext copia un par de campos relacionados a Passport como las funciones 'login' y 'authenticate'
//de las request en el contexto y las hace accesibles desde los resolvers.
const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }) => buildContext({req, res}),
});

export default apolloServer;
