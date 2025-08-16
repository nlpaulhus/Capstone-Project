import "dotenv/config";
const sessionSecret = process.env.SECRET;

//Express app:

import express, { json, urlencoded } from "express";
const app = express();
import session from "express-session";

//Import & apply cors:
import cors from "cors";
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

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

import signup from "./routes/signup.js";

app.use("/signup", signup);

app.get("/api/welcome", (req, res) => {
  res.status(200).send({ message: "Welcome" });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
