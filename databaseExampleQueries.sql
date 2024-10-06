CREATE DATABASE tropical_snacks;
CREATE USER tropical_snacks WITH ENCRYPTED PASSWORD 'tropical_snacks';
GRANT ALL PRIVILEGES ON DATABASE tropical_snacks TO tropical_snacks;
\connect tropical_snacks
CREATE SCHEMA tropical_snacks AUTHORIZATION tropical_snacks;
