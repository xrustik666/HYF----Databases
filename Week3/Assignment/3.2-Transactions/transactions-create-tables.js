import { connection } from './db.js';

connection.connect();

connection.query(`CREATE DATABASE IF NOT EXISTS bank`, (err, results) => {
  if (err) throw err;
  console.log('Created database bank');

  useDatabase();
});

// Function to use the meetup database
function useDatabase() {
  connection.query("USE bank", function (err, result) {
    if (err) throw err;
    console.log("Using recipes database");

    createTables();
  });
}

function createTables() {
  const account = `CREATE TABLE IF NOT EXISTS account (account_number INT PRIMARY KEY, balance DECIMAL(10, 2) NOT NULL)`;
  const accountChanges = `CREATE TABLE IF NOT EXISTS account_changes (change_number INT AUTO_INCREMENT PRIMARY KEY, account_number INT NOT NULL, amount DECIMAL(10, 2) NOT NULL, changed_date DATETIME NOT NULL, remark VARCHAR(255), FOREIGN KEY (account_number) REFERENCES account(account_number))`;

  connection.query(account, (err, results) => {
    if (err) throw err;

    console.log('Created table account');
  });

  connection.query(accountChanges, (err, results) => {
    if (err) throw err;

    console.log('Created table account_changes');
  });

  connection.end();
}
