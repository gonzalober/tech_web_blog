CREATE TABLE posts (
        id serial PRIMARY KEY,
        username VARCHAR ( 50 ) NOT NULL,
        createdAt TIMESTAMP ( 50 ) NOT NULL,
        updatedAt TIMESTAMP ( 50 ) NOT NULL, 
        title VARCHAR (255),
        content VARCHAR (255) 
);