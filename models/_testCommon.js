const db = require("../db.js");

async function commonBeforeAll() {
  await db.query("DELETE FROM stories");
  await db.query(`INSERT INTO stories (username, vaccine, satisfied, age, gender, story) 
    VALUES ('testUser1', 'pfizer', 'Yes', 25, 'Male', 'I got the vaccine AND was sick for a few days but now I feel great'),
    ('testUser2', 'moderna', 'No', 64, 'Female', 'After the 2nd vaccine I was sick for a week. I never leave home so was not worth it'),
    ('testUser3', 'covid', 'Severe', 33, 'Other', 'I got COVID and it sucked!'),
    ('testUser4', 'moderna', 'Yes', 55, 'Male', 'Did not feel well for a couple of days, but it was worth it to get my freedom back'),
    ('testUser5', 'johnsonandjohnson', 'Yes', 58, 'Male', 'Did not feel well for a couple of days, but it was worth it to get my freedom back');`);
}

async function commonAfterAll() {
  await db.end();
}

module.exports = { commonBeforeAll, commonAfterAll };
