CREATE TABLE users (
    userId uuid PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastNAme TEXT NOT NULL,
    email TEXT UNIQUE,
    password TEXT NOT NULL,
    IMDBname TEXT UNIQUE,
    profilePhoto TEXT
);