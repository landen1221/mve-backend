CREATE TABLE stories (
    story_id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    vaccine VARCHAR(20) NOT NULL,
    satisfied VARCHAR(20) NOT NULL,
    age INTEGER NULL,
    gender VARCHAR(7) NULL,
    story VARCHAR(1500) NOT NULL,
    flagCount INTEGER NULL DEFAULT 0, 
    visability BOOLEAN DEFAULT true, 
    fingerprint TEXT NOT NULL,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin (
    username TEXT NOT NULL PRIMARY KEY,
    password TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT false
);


-- NEW

CREATE TABLE user_flags (
    flagged_ID SERIAL PRIMARY KEY,
    fingerprint TEXT ,
    story_id INTEGER NOT NULL REFERENCES stories on DELETE CASCADE
)

