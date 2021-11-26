CREATE TABLE posts (
        id serial PRIMARY KEY,
        username VARCHAR ( 50 ) NOT NULL,
        createdAt TIMESTAMP DEFAULT Now(),
        updatedAt TIMESTAMP DEFAULT Now(), 
        title VARCHAR (255),
        content VARCHAR (255) 
);