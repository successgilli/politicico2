import { Pool } from 'pg';
import dotenv from 'dotenv';
import config from '../config';

dotenv.config();
let connect = process.env.DATABASE_URL;
console.log(config.production);
if (process.env.NODE_ENV === 'test') {
  connect = process.env.DATABASE_URL2;
}
console.log(process.env.NODE_ENV);
console.log(connect);
const pool = new Pool({ connectionString: connect });
function db(text, param) {
  return pool.query(text, param);
}
export default db;
