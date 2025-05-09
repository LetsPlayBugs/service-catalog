CREATE DATABASE postgres_test;
GRANT ALL PRIVILEGES ON DATABASE postgres_test TO postgres;

CREATE EXTENSION pg_trgm;

\c postgres_test
CREATE EXTENSION pg_trgm;


