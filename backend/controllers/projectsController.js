import db from "../db.js";
import { v4 as uuidv4 } from "uuid";
import { getUserIdFromToken } from "../helpers/authHelpers.js";

export async function network_post(req, res) {
  const { newCredits } = req.body;
  const token = req.cookies.jwt;
  let userId;
  const projectIds = [];

  try {
    if (!token) {
      return res.status(400).json("Need to login first");
    } else {
      userId = getUserIdFromToken(token);
    }

    //map over each credit, add the ids to the projectIds array, insert into projects and update image and enddate if they've changed
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
    //delete all projects from the user's network to start clean
    const deleteQuery = await db.query(
      `DELETE FROM user_projects WHERE userId = '${userId}';`
    );

    //map over all the project ids and insert the projects into the user_projects table for that user
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
    //select all of the current user's credits based on their userid
    const currentNetwork = await db.query(
      `SELECT projectimdb FROM user_projects WHERE userId='${userId}';`
    );

    const networkArray = [];

    //push the imdb id to the network array for each credit
    currentNetwork.map((credit) => networkArray.push(credit.projectimdb));

    res.status(200).json({ networkArray });
  } catch {
    res.status(400).json("error");
  }
}
