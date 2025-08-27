import db from "../db.js";
import { v4 as uuidv4 } from "uuid";

export async function imdbNetwork_post(req, res) {
  const { userId, newCredits } = req.body;
  const projectIds = [];
  console.log(userId);

  try {
    const promises = newCredits.map(async (project) => {
      projectIds.push(project.id);

      if (project.endDate !== undefined) {
        const query = `INSERT INTO projects (id, title, image, startDate, endDate)`;
        const values = `VALUES ('${project.id}', '${project.title}', '${project.image}', ${project.startDate}, ${project.endDate})`;
        const onConflict = `ON CONFLICT(id) DO UPDATE SET image = EXCLUDED.image, endDate = EXCLUDED.endDate;`;
        const newPromise = await db.query(`${query} ${values} ${onConflict}`);
        return newPromise;
      } else {
        const query = `INSERT INTO projects (id, title, image, startDate)`;
        const values = `VALUES('${project.id}', '${project.title}', '${project.image}', ${project.startDate})`;
        const onConflict = `ON CONFLICT(id) DO UPDATE SET image = EXCLUDED.image;`;
        const newPromise = await db.query(`${query} ${values} ${onConflict}`);
        return newPromise;
      }
    });

    const result = await Promise.all(promises);
  } catch (err) {
    res.status(400).json({ error: err });
  }

  try {
    const deleteQuery = await db.query(
      `DELETE FROM users_projects WHERE userId = '${userId}'`
    );
    console.log(deleteQuery);

    for (let project of projectIds) {
      const id = uuidv4();
      await db.query(
        `INSERT INTO users_projects (id, userId, projectIMDB) VALUES ('${id}'::uuid, '${userId}', '${project}') ON CONFLICT DO NOTHING;`
      );
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }

  res.status(200).json("success");
}
