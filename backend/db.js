//sql database setup

import pgPromise from "pg-promise";
const dbURI = process.env.dbURI;
const pgp = pgPromise();
const db = pgp(dbURI);

export default db;
