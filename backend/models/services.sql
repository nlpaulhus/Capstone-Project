CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    serviceName TEXT NOT NULL
);

INSERT INTO services(serviceName)
VALUES('Furniture Assembly'),
('Home Repairs'),
('Help Moving'),
('Heavy Lifting'),
('Personal Assistant'),
('Pet Care'),
('Proofreading'),
('Childcare'),
('Proofreading/Editing'),
('Hair/Makeup'),
('Stylist'),
('Tailoring'),
('Baking'),
('Commissioned Art'),
('Web Design');

