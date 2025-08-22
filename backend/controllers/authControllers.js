import jwt from "jsonwebtoken";
const maxAge = 24 * 60 * 60;
import db from "../db.js";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
const sessionSecret = process.env.SECRET;
import { genSalt, hash, compare } from "bcrypt";

const createToken = (id) => {
  return jwt.sign({ id }, sessionSecret, { expiresIn: maxAge });
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
    console.log(token);
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
      return res.status(401).json({ error: "Incorrect password" });
    } else {
      const token = createToken(user.id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json("success");
    }

    console.log(auth);
  } catch (err) {
    res.status(400).json(err);
  }
}
