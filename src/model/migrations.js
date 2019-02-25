import db from './query';

const userTable = `CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    othername VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phoneNumber VARCHAR(100) NOT NULL,
    passportUrl VARCHAR(100) NOT NULL,
    isAdmin BOOLEAN DEFAULT false);`;
const partyTable = `CREATE TABLE IF NOT EXISTS parties ( id serial PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL UNIQUE,
    hqAddress VARCHAR(100) NOT NULL,
    logoUrl VARCHAR(100) NOT NULL);`
function createTables() {
  try {
    db(`${userTable} ${partyTable}`);
    console.log('tables created');
  }
  catch (err) {
    console.log(err);
  }
}
export default createTables;
