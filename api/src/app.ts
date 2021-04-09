import express, { Request, Response, NextFunction } from "express";
const app: express.Application = express();

require("dotenv").config();
const { PORT } = process.env;

// declaramos como tienen que ser los headers
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:" + { PORT }); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default app;
