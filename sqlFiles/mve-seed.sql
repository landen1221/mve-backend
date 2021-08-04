INSERT INTO stories (username, vaccine, satisfied, age, gender, story, flagCount, fingerprint) 
VALUES ('testUser1', 'pfizer', 'Yes', 25, 'Male', 'I got the vaccine AND was sick for a few days but now I feel great', 0, 'fp1'),
('testUser2', 'moderna', 'No', 64, 'Female', 'After the 2nd vaccine I was sick for a week. I never leave home so was not worth it', 1, 'fp1'),
('testUser3', 'covid', 'Severe', 33, 'Other', 'I got COVID and it sucked!', 0, 'fp2'),
('testUser4', 'moderna', 'Yes', 55, 'Male', 'Did not feel well for a couple of days, but it was worth it to get my freedom back', 0, 'fp2'),
('testUser5', 'johnsonandjohnson', 'Yes', 41, 'Male', 'Did not feel well for a couple of days, but it was worth it to get my freedom back', 0, 'fp3'),
('testUser6', 'astrazeneca', 'Yes', 25, 'Male', 'Did not feel well for a couple of days, but it was worth it to get my freedom back', 0, 'fp4'),
('testUser7', 'covid', 'No Big Deal', 33, 'Other', 'I got COVID and it sucked!', 3, 'fp5'),
('testUser8', 'covid', 'Mild', 19, 'Female', 'I got covid while in college and the process was extremely annoying for an illness that did not impact me very much. I did feel tired and had cold-like symptoms, but in return I had to get tested more than 5 times and the college forced me to quarantine in a separate apartment for over a week. People my age had to sacrifice a lot for an illness that seemed to only impact older people.', 2, 'fp6'),
('testUser9', 'covid', 'Mild', 35, 'Female', 'I got COVID when the pandemic first started. I could not leave my bed for 2 weeks and lost nearly 10% of my body weight. It was a terrible experience. As bad as that was however, it was the lingering impact that was worse than anything. I had terrible heart palpitations which I could feel in my chest and would lead to my heart beating at over 110bpm. On top of that I had the worst brain fog imaginable. I could not think straight, could not concentrate, and could not remember anything. The heart problems lasted about 4 months and now, about a year later, the brain fog has mostly gone away, but I still feel like my brain is not working at 100%. I would not wish this on my worst enemy. Everyone should get the vaccine!', 0, 'fp7');

INSERT INTO admin (username, password) VALUES ('testAdmin', 'topSecret!');

-- New

INSERT INTO user_flags (fingerprint, story_id) VALUES ('fp1', 4), ('fp1', 5);