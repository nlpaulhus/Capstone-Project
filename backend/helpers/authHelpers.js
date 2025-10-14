import jwt from "jsonwebtoken";
import "dotenv/config";
const sessionSecret = process.env.SECRET;

import Geocodio from "geocodio-library-node";

const GEOCODIO_API_KEY = process.env.GEOCODIO_API_KEY;
const geocoder = new Geocodio(GEOCODIO_API_KEY);

const maxAge = 24 * 60 * 60;

const createToken = (id) => {
  let payload = { id: `${id}` };
  return jwt.sign(payload, sessionSecret, {
    noTimestamp: true,
    expiresIn: maxAge,
  });
};

const getCoordinatesFromZip = async (zipcode) => {
  try {
    const coordinates = await geocoder
      .geocode(zipcode)
      .then((coordinates) => coordinates.results[0].location);
    return coordinates;
  } catch (error) {
    console.log(error);
  }
};

const getUserIdFromToken = (token) => {
  let userId;
  jwt.verify(token, sessionSecret, (err, decodedToken) => {
    if (err) {
      return err;
    } else {
      userId = decodedToken.id;
    }
  });

  return userId;
};

export {
  createToken,
  getCoordinatesFromZip,
  maxAge,
  sessionSecret,
  getUserIdFromToken,
};
