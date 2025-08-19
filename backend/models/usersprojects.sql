CREATE TABLE users_projects (
   id TEXT PRIMARY KEY,
   userIMDB TEXT references users(IMDBname),
    projectIMDB TEXT references projects(id)
);