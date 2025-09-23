import jwt from "jsonwebtoken";
const maxAge = 24 * 60 * 60;
import db from "../db.js";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
const sessionSecret = process.env.SECRET;
import { genSalt, hash, compare } from "bcrypt";
import axios from "axios";
import Geocodio from "geocodio-library-node";

const GEOCODIO_API_KEY = process.env.GEOCODIO_API_KEY;
const geocoder = new Geocodio(GEOCODIO_API_KEY);

const createToken = (id) => {
  let payload = { id: `${id}` };
  return jwt.sign(payload, sessionSecret, {
    noTimestamp: true,
    expiresIn: maxAge,
  });
};

export async function signup_post(req, res) {
  console.log("route hit");
  console.log(req.body);
  let {
    firstName,
    lastName,
    email,
    password,
    IMDBName,
    street,
    city,
    state,
    zip,
    profilePhoto,
  } = req.body;
  const userid = uuidv4();
  const salt = await genSalt();
  password = await hash(password, salt);
  email = email.toLowerCase();

  const coordinates = await geocoder
    .geocode(zip)
    .then((coordinates) => coordinates.results[0].location);

  let lat = coordinates.lat;
  let lng = coordinates.lng;

  try {
    const result = await db.query(
      `INSERT INTO users (userid, firstname, lastname, email, password, imdbname, street, city, state, zip, geom, profilephoto) VALUES('${userid}', '${firstName}', '${lastName}', '${email}', '${password}', '${IMDBName}', '${street}', '${city}', '${state}', '${zip}', ST_GeomFromText('POINT(${lat} ${lng})', 4326), '${profilePhoto}')`
    );
    console.log(result);
    const token = createToken(userid);
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ success: "Success" });
  } catch (error) {
    res.status(400).json(error.detail);
  }
}

export async function login_post(req, res) {
  let { email, password } = req.body;
  email = email.toLowerCase();

  try {
    const user = await db
      .query(`SELECT * FROM users WHERE email = '${email}'`)
      .then((user) => user[0]);

    if (!user) {
      return res
        .status(401)
        .json({ error: "There is no user registered with that email." });
    }

    const auth = await compare(password, user.password);
    if (auth === false) {
      return res.status(401).json({ error: "Incorrect password." });
    } else {
      const token = createToken(user.userid);
      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: maxAge * 1000,
      });
      res.status(200).json("success");
    }
  } catch (err) {
    res.status(400).json({ error: "Unknown server error." });
  }
}

export async function user_get(req, res) {
  const token = req.cookies.jwt;
  let userId;

  if (!token) {
    res.status(401).json("Need to login first");
  } else {
    jwt.verify(token, sessionSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json("Need to login first");
      } else {
        userId = decodedToken.id;
      }
    });

    const user = await db.query(
      `SELECT city, email, firstname, imdbname, profilePhoto, userid, zip, ST_X(geom) AS lat, ST_Y(geom) as lng, geom FROM users WHERE userid = '${userId}';`
    );

    res.status(200).json(user[0]);
  }
}

export async function network_get(req, res) {
  const token = req.cookies.jwt;
  let userId;

  if (!token) {
    res.status(401).json("Need to login first");
  } else {
    jwt.verify(token, sessionSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json("Need to login first");
      } else {
        userId = decodedToken.id;
      }
    });

    try {
      const currentNetwork = await db.query(
        `SELECT projectIMDB FROM user_projects WHERE userId = '${userId}'`
      );

      const networkArray = [];

      currentNetwork.map((credit) => networkArray.push(credit.projectimdb));

      res.status(200).json({ networkArray });
    } catch {
      res.status(400).json("error");
    }
  }
}

export function logout_get(req, res) {
  req.session.destroy((err) => {
    // Destroy the server-side session
    if (err) {
      return res.status(500).send("Error logging out");
    }
    // Clear the session cookie on the client by setting its expiration
  });

  res.clearCookie("jwt"); // Replace 'session_id' with your actual cookie name
  res.end();
}

export function profile_get(req, res) {}
