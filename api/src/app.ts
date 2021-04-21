import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import { v4 as uuid } from "uuid";
import passport from "passport";
import db from "./models";
import { usersSeeder } from "./seeders/test";
import { getUsers } from "./seeders/test";
import { GraphQLLocalStrategy } from "graphql-passport";
import { iUserFacebook } from "./interfaces/index";
import * as passportFacebook from "passport-facebook";
const facebookStrategy = passportFacebook.Strategy;
import { CLIENT_RENEG_WINDOW } from "node:tls";
const app: express.Application = express();

// app.use(passport.initialize());
// app.use(passport.session());

require("dotenv").config();
const PORT = "localhost:3000" || "localhost:5000";

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID || "";
const FACEBOOK_APP_SECRET = "a1e05f5a17e23fd232a21f169690dd37";

//añadimos el soporte para el registro y login desde los resolvers de graphQL para evitar hacer rutas nuevas
//usando la libreria graphql-passport, podemos acceder a las funciones de passport desde el contexto de GraphQL
//añadimos estrategia de passport para logear con email y contraseña
passport.use(
  new GraphQLLocalStrategy(async (email: any, password: any, done: any) => {
    const users = await db.User.findAll();
    // console.log(users);
    const matchingUser = users.find(
      (user: any) => email === user.email && password === user.password
    );
    // console.log(matchingUser);
    const error = matchingUser ? null : new Error("no matching user found");
    done(error, matchingUser);
  })
);

/* const facebookOptions: iUserFacebook = {
  clientID: "FACEBOOK_CLIENT_ID",
  clientSecret: "FACEBOOK_APP_SECRET",
  callbackURL: "http://localhost:5000/auth/facebook/callback",
  profileFields: ["id", "email", "first_name", "last_name"],
}; */
/* const facebookCallback = async (
  accessToken: any,
  refreshToken: any,
  profile: any,
  done: any
) => {
  const users: any = await User.findAll();
  // console.log(users)
  const matchingUser = users?.find(
    (user: any) => user.dataValues.facebookId === profile.id
  );
  // console.log(matchingUser)
  if (matchingUser) {
    done(null, matchingUser);
    return;
  }

  let input: any = {
    id: uuid(),
    facebookId: profile.id,
    name: profile.name.givenName,
    surname: profile.name.familyName,
    email: profile.emails && profile.emails[0] && profile.emails[0].value,
    privilege: "user",
    active: true,
    password: null,
    address: null,
    username: null,
  };

  User.create({
    ...input,
  });

  done(null, input);
}; */

// passport.use(new facebookStrategy(facebookOptions, facebookCallback));

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser(async (id:any, done) => {
  const users: any = await db.User.findAll();
  console.log('--------------------------------', id)
  const matchingUser = users.find((user: any) => user.dataValues.id === id.id);
  console.log("++++++++++++++++++++++++++++++++++++", matchingUser);
  done(null, matchingUser);
});

const SESSION_SECRET = "bad secret";

// declaramos como tienen que ser los headers
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://" + { PORT }); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(
  session({
    genid: (req) => uuid(),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
/* app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "http://localhost:5000/graphql",
      failureRedirect: "http://localhost:5000/graphql",
    })
    );
    ); */

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default app;
