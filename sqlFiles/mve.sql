\echo 'Delete and recreate mve db?'
\prompt 'Return for yes or control-c to cancel > ' foo

DROP DATABASE mve_two;
CREATE DATABASE mve_two;
\c mve_two;

\i mve-schema.sql
\i mve-seed.sql