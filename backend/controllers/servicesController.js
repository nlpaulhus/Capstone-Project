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
  try {
    const servicename = req.params.servicename;
    const sortby = req.query.sortby || "rating";
    const innetwork = req.query.innetwork || false;
    const hourly = req.query.hourly || false;
    const flatrate = req.query.flatrate || false;
    const userId = req.params.userId;
    console.log(servicename);
    console.log(userId);
    const listings = await db.query(
      `SELECT user_services.description, user_services.price, user_services.paymenttype, user_services.servicename, users.firstname, users.lastname, users.userid, users.profilephoto, users.lat, users.lng FROM user_services INNER JOIN users ON users.userid=user_services.userid AND user_services.serviceName = '${servicename}' AND user_services.userId != '${userId}'::uuid;`
    );
    console.log(listings);
    res.status(200).json({ listings });
  } catch (err) {
    res.status(401).json(err);
  }
}
