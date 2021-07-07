CREATE TABLE stories (
    story_id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    vaccine VARCHAR(20) NOT NULL,
    satisfied VARCHAR(20) NOT NULL,
    age INTEGER NULL,
    gender VARCHAR(7) NULL,
    story VARCHAR(1500) NOT NULL
);

