import "dotenv/config";
const sessionSecret = process.env.SECRET;
const dbURI = process.env.dbURI;

//Express app:

import express, { json, urlencoded } from "express";
const app = express();
import session from "express-session";

//Import & apply cors:
import cors from "cors";
app.use(cors());

//Middleware:
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
  session({
    secret: sessionSecret,
    saveUninitialized: false,
    resave: false,
  })
);

app.get("/api/welcome", (req, res) => {
  res.status(200).send({ message: "Welcome" });
});

//sql database setup

import pgPromise from "pg-promise";
const pgp = pgPromise();
const db = pgp(dbURI);

db.one("SELECT $1 AS value", 123)
  .then((data) => {
    console.log(data.value);
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
