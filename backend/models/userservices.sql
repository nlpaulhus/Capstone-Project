CREATE TABLE user_services (
    id TEXT PRIMARY KEY,
    userId uuid references users(userId),
    serviceName TEXT NOT NULL,
    description TEXT NOT NULL,
    price INT NOT NULL,
    paymentType TEXT NOT NULL
);