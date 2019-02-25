import { Pool } from 'pg';
import dotenv from 'dotenv';
import config from '../config';

dotenv.config();
let connect = process.env.DATABASE_URL;
if (process.env.NODE_ENV === 'test') {
  connect = process.env.DATABASE_URL2;
}
const pool = new Pool({ connectionString: connect });
function db(text, param) {
  return pool.query(text, param);
}
export default db;
