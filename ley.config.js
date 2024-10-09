import { config } from 'dotenv-safe';
import { postgresConfig } from './util/config.js';

config();

export default postgresConfig;
