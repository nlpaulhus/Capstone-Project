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
      `SELECT * FROM userservices WHERE userId = '${userId}'`
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

      const query = `INSERT INTO userservices (id, userId, serviceName, description, price, paymentType)`;
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
      `DELETE from userservices WHERE id = '${serviceId}'`
    );
    res.status(200).json("deleted");
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function search_get(req, res) {
  try {
    const servicename = req.params.servicename;
    const userId = req.params.userId;
    console.log(servicename);
    console.log(userId);
    const listings = await db.query(
      `SELECT userservices.description, userservices.price, userservices.paymenttype, userservices.servicename, users.firstname, users.lastname, users.userid, users.profilephoto FROM userservices INNER JOIN users ON users.userid=userservices.userid AND userservices.serviceName = '${servicename}' AND userservices.userId != '${userId}'::uuid;`
    );
    console.log(listings);
    res.status(200).json({ listings });
  } catch (err) {
    res.status(401).json(err);
  }
}
