import db from './query';

const userTable = `CREATE TABLE IF NOT EXISTS users ( id serial PRIMARY KEY NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    othername VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phoneNumber VARCHAR(100) NOT NULL,
    passportUrl VARCHAR(100) NOT NULL,
    password VARCHAR(300) NOT NULL,
    isAdmin BOOLEAN DEFAULT false);`;
const partyTable = `CREATE TABLE IF NOT EXISTS parties ( id serial PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL UNIQUE,
    hqAddress VARCHAR(100) NOT NULL,
    logoUrl VARCHAR(100) NOT NULL);`;
const officeTable = `CREATE TABLE IF NOT EXISTS offices (
  id serial PRIMARY KEY NOT NULL,
  type VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL UNIQUE
);`;
const candidateTable = `CREATE TABLE IF NOT EXISTS candidates (
  id serial NOT NULL UNIQUE,
  userId INTEGER NOT NULL REFERENCES users(id),
  officeId INTEGER NOT NULL REFERENCES offices(id),
  partyId INTEGER NOT NULL REFERENCES parties(id),
  PRIMARY KEY (userId, officeId)  
);`;
const voteTable = `CREATE TABLE IF NOT EXISTS votes (
  id serial NOT NULL,
  createdBy INTEGER NOT NULL REFERENCES users(id),
  office INTEGER NOT NULL REFERENCES offices(id),
  candidate INTEGER NOT NULL REFERENCES candidates(id),
  createdOn DATE DEFAULT CURRENT_DATE,
  PRIMARY KEY (createdBy, office)
);`;

function createTables() {
  try {
    db(`${userTable} ${partyTable} ${officeTable} ${candidateTable} ${voteTable}`);
    console.log('tables created');
  }
  catch (err) {
    console.log(err);
  }
}

export default createTables;
