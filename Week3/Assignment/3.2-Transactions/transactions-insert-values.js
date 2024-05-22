import { connection } from './db.js';

connection.config.database = 'bank';

connection.connect();

// Inserting data into account table
connection.query(`INSERT INTO account (account_number, balance) 
                  VALUES (101, 5000.00) 
                  ON DUPLICATE KEY UPDATE balance = VALUES(balance)`, 
                  (err, results) => {
  if (err) throw err;

  console.log('Inserted or updated account 101');
});

connection.query(`INSERT INTO account (account_number, balance) 
                  VALUES (102, 3000.00) 
                  ON DUPLICATE KEY UPDATE balance = VALUES(balance)`, 
                  (err, results) => {
  if (err) throw err;

  console.log('Inserted or updated account 102');
});

// Inserting data into account_changes table
connection.query(`INSERT INTO account_changes (account_number, amount, changed_date, remark) 
                  VALUES (101, 5000.00, NOW(), 'Initial deposit')`, 
                  (err, results) => {
  if (err) throw err;

  console.log('Inserted into account_changes for account 101');
});

connection.query(`INSERT INTO account_changes (account_number, amount, changed_date, remark) 
                  VALUES (102, 3000.00, NOW(), 'Initial deposit')`, 
                  (err, results) => {
  if (err) throw err;

  console.log('Inserted into account_changes for account 102');
});

connection.end();