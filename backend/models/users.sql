CREATE TABLE users (
    userId uuid PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastNAme TEXT NOT NULL,
    email TEXT UNIQUE,
    password TEXT NOT NULL,
    IMDBname TEXT UNIQUE,
    profilePhoto TEXT,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL,
    lat NUMERIC(9,6) NOT NULL,
    lng NUMERIC(9,6) NOT NULL
);