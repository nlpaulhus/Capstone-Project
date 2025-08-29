import "dotenv/config";
const sessionSecret = process.env.SECRET;
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import multer from "multer";

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
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.memoryStorage();
const upload = multer({ storage });
const myUploadMiddleware = upload.single("sample_file");

app.use(
  session({
    secret: sessionSecret,
    saveUninitialized: false,
    resave: false,
  })
);

import signup from "./routes/signup.js";
import imdbNetwork from "./routes/imdbNetwork.js";
import services from "./routes/services.js";
import userServices from "./routes/userServices.js";
import login from "./routes/login.js";
import user from "./routes/user.js";
import handler from "./controllers/upload.js";

app.use("/signup", signup);
app.use("/imdbNetwork", imdbNetwork);
app.use("/services", services);
app.use("/userServices", userServices);
app.use("/login", login);
app.use("/user", user);

app.get("/api/welcome", (req, res) => {
  res.status(200).send({ message: "Welcome" });
});

app.post("/api/upload", (req, res) => handler(req, res));

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
