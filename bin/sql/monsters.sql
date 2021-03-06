CREATE TABLE monsters(
    id serial,
    name varchar(50),
    personality varchar(50)
);

CREATE TABLE habitats(
    id serial,
    name varchar(50),
    climate varchar(50),
    temperature int
);


CREATE TABLE lives(
    monster varchar(50),
    habitat varchar(50)
);


INSERT INTO monsters(name, personality)
VALUES 
('Fluffy', 'aggro'),
('Noodie', 'free'),
('Rusty', 'stiffy')
;

INSERT INTO habitats(name, climate, temperature)
VALUES 
('desert', 'dry', 100),
('forrest', 'haunted', 70),
('mountain', 'high', 10)
;

INSERT INTO lives(monster, habitat)
VALUES 
('Fluffy','desert'),
('Noodles','forrest' ),
('Rusty','mountain')
;