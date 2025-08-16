import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
const maxAge = 24 * 60 * 60;
import db from "../db.js";
import { v4 as uuidv4 } from "uuid";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: maxAge });
};

const handleErrors = (err) => {};

export async function signup_post(req, res) {
  const { firstName, lastName, email, password, IMDBName } = req.body;
  const userid = uuidv4();

  try {
    const result = await db.query(
      `INSERT INTO users (userid, firstname, lastname, email, password, imdbname) VALUES('${userid}', '${firstName}', '${lastName}', '${email}', '${password}', '${IMDBName}');`
    );
    console.log("Data inserted successfuly:", result);
    res.send(result);
  } catch (error) {
    res.status(400).json(error.detail);
  }
}
