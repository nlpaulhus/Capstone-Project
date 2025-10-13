import db from "../db.js";
import { v4 as uuidv4 } from "uuid";
import { getUserIdFromToken } from "../helpers/authHelpers.js";

export async function network_post(req, res) {
  console.log("post route hit");
  const { newCredits } = req.body;
  const token = req.cookies.jwt;
  let userId;
  const projectIds = [];

  console.log(newCredits);
  console.log(token);

  try {
    if (!token) {
      return res.status(400).json("Need to login first");
    } else {
      userId = getUserIdFromToken(token);
    }
    console.log(userId);

    const promises = newCredits.map(async (project) => {
      console.log(project);
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
      `DELETE FROM user_projects WHERE userId = '${userId}';`
    );

    console.log(projectIds);
    for (let project of projectIds) {
      const id = uuidv4();
      console.log(
        `INSERT INTO user_projects (id, userId, projectIMDB) VALUES ('${id}'::uuid, '${userId}', '${project}') ON CONFLICT DO NOTHING;`
      );
      await db.query(
        `INSERT INTO user_projects (id, userId, projectIMDB) VALUES ('${id}'::uuid, '${userId}', '${project}') ON CONFLICT DO NOTHING;`
      );
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }

  res.status(200).json("success");
}

export async function network_get(req, res) {
  const token = req.cookies.jwt;
  let userId;

  if (!token) {
    res.status(401).json("Need to login first");
  } else {
    userId = getUserIdFromToken(token);
  }

  try {
    const currentNetwork = await db.query(
      `SELECT projectimdb FROM user_projects WHERE userId='${userId}';`
    );

    const networkArray = [];

    currentNetwork.map((credit) => networkArray.push(credit.projectimdb));

    res.status(200).json({ networkArray });
  } catch {
    res.status(400).json("error");
  }
}
