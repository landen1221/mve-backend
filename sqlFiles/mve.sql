\echo 'Delete and recreate mve db?'
\prompt 'Return for yes or control-c to cancel > ' foo

DROP DATABASE my_vaccine_experience;
CREATE DATABASE my_vaccine_experience;
\c my_vaccine_experience;

\i mve-schema.sql
\i mve-seed.sql