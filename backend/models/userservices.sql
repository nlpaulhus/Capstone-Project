CREATE TABLE usersservices (
    id SERIAL PRIMARY KEY,
    userId TEXT NOT NULL,
    serviceName TEXT NOT NULL,
    description TEXT NOT NULL,
    price INT NOT NULL,
    paymentType TEXT NOT NULL
);