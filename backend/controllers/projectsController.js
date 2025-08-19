import db from "../db.js";
import { v4 as uuidv4 } from "uuid";

export async function imdbNetwork_post(req, res) {
  const { imdbname, network } = req.body;
  const projectIds = [];

  try {
    for (let project of network) {
      projectIds.push(project.id);

      if (project.endDate !== undefined) {
        const query = `INSERT INTO projects (id, title, image, startDate, endDate)`;
        const values = `VALUES('${project.id}', '${project.title}', '${project.image}', ${project.startDate}, ${project.endDate})`;
        const onConflict = `ON CONFLICT(id) DO UPDATE SET image= EXCLUDED.image, endDate = EXCLUDED.endDate;`;
        await db.query(`${query} ${values} ${onConflict}`);
      } else {
        const query = `INSERT INTO projects (id, title, image, startDate)`;
        const values = `VALUES('${project.id}', '${project.title}', '${project.image}', ${project.startDate})`;
        const onConflict = `ON CONFLICT(id) DO UPDATE SET image= EXCLUDED.image;`;
        await db.query(`${query} ${values} ${onConflict}`);
      }
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }

  try {
    for (let project of projectIds) {
      const id = uuidv4();
      await db.query(
        `INSERT INTO users_projects (id, userIMDB, projectIMDB) VALUES ('${id}', '${imdbname}', '${project}');`
      );
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }

  res.status(200).json("Success");
}
