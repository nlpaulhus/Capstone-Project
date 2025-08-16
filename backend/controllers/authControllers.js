import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
const maxAge = 24 * 60 * 60;
import db from "../db.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: maxAge });
};

export async function signup_post(req, res) {
  const { firstName, lastName, email, password, IMDBName } = req.body;

  try {
    const query = `INSERT INTO users (firstName, lastName, email, password, IMDBName)
    VALUES(${firstName}, ${lastName}, ${email}, ${password}, ${IMDBName})`;

    const result = await db.query(query);
    console.log("Data inserted successfuly:", result);
    res.send(result.rows[0]);
  } catch (error) {
    console.log("Error inserting data", error);
    res.send(error);
    throw error;
  } finally {
    await db.end();
  }
}
