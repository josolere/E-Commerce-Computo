import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();
import session from "express-session";
import { v4 as uuid } from "uuid";
import passport from "passport";
import db from "./models";
import { GraphQLLocalStrategy } from "graphql-passport";
import { iUserFacebook } from "./interfaces/index";
import * as passportFacebook from "passport-facebook";
const facebookStrategy = passportFacebook.Strategy;
import { CLIENT_RENEG_WINDOW } from "node:tls";
import googleOAuth from 'passport-google-oauth20'
import { User } from "./models/User";
const app: express.Application = express();


const PORT = "localhost:3000" || "localhost:5000";

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000'
}

var googleStrategy = googleOAuth.Strategy

require("dotenv").config();


const FACEBOOK_CLIENT_ID = "936411523566877";
const FACEBOOK_APP_SECRET = "a1e05f5a17e23fd232a21f169690dd37";
const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_SECRET;

//añadimos el soporte para el registro y login desde los resolvers de graphQL para evitar hacer rutas nuevas
//usando la libreria graphql-passport, podemos acceder a las funciones de passport desde el contexto de GraphQL
//añadimos estrategia de passport para logear con email y contraseña
passport.use(
  new GraphQLLocalStrategy(async (email: any, password: any, done: any) => {
    const users = await db.User.findAll();
    
    const matchingUser = users.find(
      (user: any) => email === user.email && password === user.password
    );
    
    const error = matchingUser ? null : new Error("no matching user found");
    done(error, matchingUser);
  })
);



const facebookOptions: iUserFacebook = {
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:5000/auth/facebook/callback",
  profileFields: ["id", "email", "first_name", "last_name"],
};
const googleOptions: any = {
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: 'http://localhost:5000/auth/google/redirect',
}
const facebookCallback = async (
  accessToken: any,
  refreshToken: any,
  profile: any,
  done: any
) => {
  const users: any = await db.User.findAll();
  // console.log(users)
  const matchingUser = users?.find(
    (user: any) => user.dataValues.facebookId === profile.id
  );
 
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

  db.User.create({
    ...input,
  });

  done(null, input);
};

const googleCallback = (accessToken:any, refreshToken:any, email:any ,profile:any,  cb:any) => {
  
    console.log('+++++++++++++++++++++',profile)
    console.log('---------------------',email)

    let input: any = {
      id: uuid(),
      googleId: profile.id,
      name: profile.name.givenName,
      surname: profile.name.familyName,
      email: profile.emails && profile.emails[0] && profile.emails[0].value,
      privilege: "user",
      active: true,
      password: null,
      address: null,
      username: null,
    };
  
    db.User.create({
      ...input,
    });
  
    cb(null, input);
  }
  

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser(async (id: any, done) => {
  const users: any = await db.User.findAll();
  const matchingUser = users.find((user: any) => user.dataValues.id === id.id);
  //console.log("++++++++++++++++++++++++++++++++++++", matchingUser);
  if( matchingUser !== undefined){
    done(null, matchingUser);
  }else{
    done(null, true)
  }
  
});

const SESSION_SECRET = "bad secret";

// declaramos como tienen que ser los headers
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
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
passport.use(new facebookStrategy(facebookOptions, facebookCallback));

passport.use(new googleStrategy(
  googleOptions ,
  googleCallback
  ));

app.use(passport.initialize());
app.use(passport.session());


//Rutas autenticación facebook

app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));

app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "http://localhost:3000/Home",
      failureRedirect: "http://localhost:5000/graphql",
    }),
    ); 


//Rutas autenticación google

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}))

app.get('/auth/google/redirect', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5000/graphql'}),
  function(req, res) {
    //successful authentication
    res.redirect('http://localhost:3000/Home')
  }
  )


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).send(message);
});

export default app;