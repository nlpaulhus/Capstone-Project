CREATE TABLE users_projects (
   id TEXT PRIMARY KEY,
   userId uuid references users(userId),
    projectIMDB TEXT references projects(id)
);