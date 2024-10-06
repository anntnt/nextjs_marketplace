import { config } from 'dotenv-safe';
import postgres from 'postgres';

// This is connecting to Postgres from Node.js
config();
const sql = postgres();
