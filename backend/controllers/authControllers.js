import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
const maxAge = 24 * 60 * 60;
import db from "../db.js";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
const sessionSecret = process.env.SECRET;

const createToken = (id) => {
  return jwt.sign({ id }, sessionSecret, { expiresIn: maxAge });
};

export async function signup_post(req, res) {
  const { firstName, lastName, email, password, IMDBName } = req.body;
  const userid = uuidv4();

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
