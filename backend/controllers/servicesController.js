import db from "../db.js";

export async function services_get(req, res) {
  try {
    const allServices = await db.query("SELECT serviceName FROM services");

    const serviceNames = allServices.map((service) => service.servicename);

    res.status(200).json({ serviceNames });
  } catch (err) {
    return res.status(400).json({ err });
  }
}

export async function userservices_get(req, res) {
  try {
    const userId = req.params.userId;

    const yourServices = await db.query(
      `SELECT * FROM user_services WHERE userId = '${userId}'`
    );

    res.status(200).json({ yourServices });
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function userservices_post(req, res) {
  const { servicesToAdd, userId } = req.body;
  console.log(servicesToAdd);
  console.log(userId);

  try {
    const promises = servicesToAdd.map(async (service) => {
      const description = service.description.replace("'", "''");

      const query = `INSERT INTO user_services (id, userId, serviceName, description, price, paymentType)`;
      const values = `VALUES ('${service.id}', '${userId}', '${
        service.servicename
      }', '${description}', ${parseInt(service.price)}, '${
        service.paymenttype
      }')`;
      const onConflict = `ON CONFLICT(id) DO UPDATE SET serviceName = EXCLUDED.serviceName, description = EXCLUDED.description, price = EXCLUDED.price, paymentType = EXCLUDED.paymentType;`;
      console.log(`${query} ${values} ${onConflict}`);
      const newService = await db.query(`${query} ${values} ${onConflict}`);
      return newService;
    });

    const resultArray = await Promise.all(promises);

    res.status(200).json("success");
  } catch (err) {
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
  console.log("route hit");
  try {
    const servicename = req.params.servicename;
    const userId = req.params.userId;
    const hourly = req.query.hourly || false;
    const flatrate = req.query.flatrate || false;
    const searchRadius = req.query.searchRadius || 30;

    const searchMeters = searchRadius * 1609.344;

    const currentUserGeom = await db
      .query(
        `SELECT ST_AsText(geom) FROM users WHERE userid = '${userId}'::uuid;`
      )
      .then((currentUserGeom) => currentUserGeom[0].st_astext);

    console.log(currentUserGeom);

    const query = `SELECT user_services.id, user_services.description, user_services.price, user_services.paymenttype, user_services.servicename, users.firstname, users.lastname, users.city, users.state, users.userid, users.profilephoto, ST_X(users.geom) AS lat, ST_Y(users.geom) as lng FROM user_services INNER JOIN users ON users.userid=user_services.userid AND user_services.serviceName = '${servicename}' AND user_services.userId != '${userId}'::uuid AND ST_DWithin(users.geom, ST_GeomFromText('${currentUserGeom}', 4326), ${searchMeters}, true)`;
    let listings;

    console.log(query);

    if (hourly === "true") {
      listings = await db.query(
        `${query} AND user_services.paymenttype = 'hourly';`
      );
    } else if (flatrate === "true") {
      listings = await db.query(
        `${query} AND user_services.paymenttype = 'flatrate';`
      );
    } else {
      listings = await db.query(`${query};`);
    }

    console.log(listings);

    const currentUserProjects = await db.query(
      `SELECT projectimdb FROM user_projects WHERE userId='${userId}';`
    );

    const currentUserNetwork = [];

    for (let project of currentUserProjects) {
      currentUserNetwork.push(project.projectimdb);
    }

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

    console.log(listings);

    res.status(200).json({ listings });
  } catch (err) {
    res.status(401).json(err);
  }
}
