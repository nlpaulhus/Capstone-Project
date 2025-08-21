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
  const { yourServices } = req.body;
  const userId = req.params.userId;

  try {
    const promises = yourServices.map(async (service) => {
      const query = `INSERT INTO userservices (id, userId, serviceName, description, price, paymentType)`;
      const values = `VALUES('${service.id}', '${userId}', '${
        service.servicename
      }', '${service.description}', ${parseInt(service.price)}, '${
        service.paymentType
      }')`;
      const onConflict = `ON CONFLICT(id) DO UPDATE SET serviceName = EXCLUDED.serviceName, description = EXCLUDED.description, price = EXCLUDED.price, paymentType = EXCLUDED.paymentType`;
      const newService = await db.query(`${query} ${values} ${onConflict}`);
      return newService;
    });

    const resultArray = await Promise.all(promises);

    res.status(200).json("success");
  } catch (err) {
    res.status(400).json(err);
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
