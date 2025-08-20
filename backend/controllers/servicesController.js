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
      `SELECT * FROM usersservices WHERE userId = '${userId}'`
    );

    res.status(200).json({ yourServices });
  } catch (err) {
    res.status(400).json(err);
  }
}
