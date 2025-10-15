import db from "../db.js";
import {
  getUserIdFromToken,
  getCoordinatesFromZip,
} from "../helpers/authHelpers.js";

export async function services_get(req, res) {
  try {
    const allServices = await db.query(
      "SELECT serviceName FROM services ORDER BY serviceName;"
    );

    const serviceNames = allServices.map((service) => service.servicename);

    res.status(200).json({ serviceNames });
  } catch (err) {
    return res.status(400).json({ err });
  }
}

export async function userservices_get(req, res) {
  try {
    const token = req.cookies.jwt;
    const userId = getUserIdFromToken(token);

    const yourServices = await db.query(
      `SELECT * FROM user_services WHERE userId = '${userId}';`
    );

    res.status(200).json({ yourServices });
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function userservices_post(req, res) {
  const { servicesToAdd } = req.body;
  const token = req.cookies.jwt;
  const userId = getUserIdFromToken(token);

  try {
    const promises = servicesToAdd.map(async (service) => {
      //edit text format before submitting to database
      const description = service.description.replace("'", "''");

      const query = `INSERT INTO user_services (id, userId, serviceName, description, price, paymentType)`;
      const values = `VALUES ('${service.id}', '${userId}'::uuid, '${
        service.servicename
      }', '${description}', ${parseInt(service.price)}, '${
        service.paymenttype
      }')`;
      const onConflict = `ON CONFLICT(id) DO UPDATE SET serviceName = EXCLUDED.serviceName, description = EXCLUDED.description, price = EXCLUDED.price, paymentType = EXCLUDED.paymentType;`;

      const newService = await db.query(`${query} ${values} ${onConflict}`);
      return newService;
    });

    const resultArray = await Promise.all(promises);

    res.status(200).json("success");
  } catch (err) {
    console.log(err);
    res.status(401).json({ err });
  }
}

export async function userservice_delete(req, res) {
  const serviceId = req.params.serviceId;

  try {
    const result = await db.query(
      `DELETE from user_services WHERE id = '${serviceId}'`
    );
    res.status(200).json("deleted");
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function search_get(req, res) {
  //Get all possible search params and querys from request
  const servicename = req.params.servicename;
  const innetwork = req.query.innetwork || false;
  const hourly = req.query.hourly || false;
  const flatrate = req.query.flatrate || false;
  const searchRadius = req.query.searchRadius;
  const zipcode = req.query.zipcode;
  const page = req.query.p || 0;

  //set pagination
  const offsetAmount = parseInt(page) * 10;
  const pagination = `LIMIT 10 OFFSET ${offsetAmount}`;

  //get current logged in user Id from request token
  const token = req.cookies.jwt;
  const userId = getUserIdFromToken(token);

  //get lat and lng based on query or current user

  try {
    let userzip;

    if (zipcode !== undefined) {
      userzip = zipcode;
    } else {
      userzip = await db
        .query(`SELECT zip FROM users WHERE userid = '${userId}'::uuid;`)
        .then((userzip) => userzip[0].zip);
    }

    let mapCoordinates;

    if (zipcode === undefined) {
      mapCoordinates = await db
        .query(
          `SELECT ST_X(geom) AS lat, ST_Y(geom) AS lng FROM users WHERE userid = '${userId}'::uuid;`
        )
        .then((currentUserGeom) => currentUserGeom[0]);
    } else {
      mapCoordinates = await getCoordinatesFromZip(zipcode);
    }

    let listings;
    let searchMeters;
    let query = `SELECT user_services.id, user_services.description, user_services.price, user_services.paymenttype, user_services.servicename, users.firstname, users.lastname, users.city, users.state, users.userid, users.profilephoto, ST_X(users.geom) AS lat, ST_Y(users.geom) as lng FROM user_services INNER JOIN users ON users.userid=user_services.userid AND user_services.serviceName = '${servicename}' AND user_services.userId != '${userId}'::uuid`;

    if (searchRadius !== "none") {
      if (!searchRadius) {
        searchMeters = 30 * 1609.34;
      } else {
        searchMeters = searchRadius * 1609.34;
      }

      query += ` AND ST_DWithin(users.geom, ST_GeomFromText('POINT(${mapCoordinates.lat.toString()} ${mapCoordinates.lng.toString()})', 4326), ${searchMeters}, true)`;
    }

    if (hourly === "true") {
      listings = await db.query(
        `${query} AND user_services.paymenttype = 'hourly' ${pagination};`
      );
    } else if (flatrate === "true") {
      listings = await db.query(
        `${query} AND user_services.paymenttype = 'flatrate' ${pagination};`
      );
    } else {
      listings = await db.query(`${query} ${pagination};`);
    }

    //At this point have all listings based on pagination, zipcode, paymenttype, radius

    //To filter innetwork:

    //Get the current logged in user's network:

    const currentUserProjects = await db.query(
      `SELECT projectimdb FROM user_projects WHERE userId='${userId}';`
    );

    const currentUserNetwork = [];

    for (let project of currentUserProjects) {
      currentUserNetwork.push(project.projectimdb);
    }

    // currentUserNetwork array contains the current logged in users projectimdb ids

    //get network for each listings user and if there's a match add innetwork true if no match add innetwork false:

    for (let listing of listings) {
      const userProjects = await db.query(
        `SELECT projectimdb FROM user_projects WHERE userId='${listing.userid}';`
      );

      const projectsInBoth = [];
      for (let project of userProjects) {
        if (currentUserNetwork.includes(project.projectimdb))
          projectsInBoth.push(project.projectimdb);
      }

      if (projectsInBoth.length) {
        listing.inNetwork = true;
      } else {
        listing.inNetwork = false;
      }
    }

    let filteredListings;

    if (innetwork === "true") {
      filteredListings = listings.filter(
        (listing) => listing.inNetwork === true
      );
    } else {
      filteredListings = listings;
    }

    let allServices = await db.query(
      "SELECT serviceName FROM services ORDER BY serviceName;"
    );

    allServices = allServices.map((service) => service.servicename);

    res
      .status(200)
      .json({ filteredListings, allServices, mapCoordinates, userzip });
  } catch (err) {
    res.status(401).json(err);
  }
}
