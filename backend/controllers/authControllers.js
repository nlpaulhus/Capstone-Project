import jwt from "jsonwebtoken";
const maxAge = 24 * 60 * 60;
import db from "../db.js";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
const sessionSecret = process.env.SECRET;
import { genSalt, hash, compare } from "bcrypt";

const createToken = (id) => {
  let payload = { id: `${id}` };
  return jwt.sign(payload, sessionSecret, {
    noTimestamp: true,
    expiresIn: maxAge,
  });
};

export async function signup_post(req, res) {
  let { firstName, lastName, email, password, IMDBName } = req.body;
  const userid = uuidv4();
  const salt = await genSalt();
  password = await hash(password, salt);
  email = email.toLowerCase();

  try {
    const result = await db.query(
      `INSERT INTO users (userid, firstname, lastname, email, password, imdbname) VALUES('${userid}', '${firstName}', '${lastName}', '${email}', '${password}', '${IMDBName}');`
    );
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
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
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
      `SELECT * FROM users WHERE userId = '${userId}'`
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
        `SELECT projectIMDB FROM users_projects WHERE userId = '${userId}'`
      );

      const networkArray = [];

      currentNetwork.map((credit) => networkArray.push(credit.projectimdb));

      res.status(200).json({ networkArray });
    } catch {
      res.status(400).json("error");
    }
  }
}
