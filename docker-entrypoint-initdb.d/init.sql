CREATE TABLE posts (
        id serial PRIMARY KEY,
        username VARCHAR ( 50 ) NOT NULL,
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP, title VARCHAR (255),
        content VARCHAR (255) 
);