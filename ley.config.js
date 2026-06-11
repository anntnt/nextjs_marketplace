import { postgresConfig, setEnvironmentVariables } from './lib/config/database.js';

setEnvironmentVariables();
export default postgresConfig;
