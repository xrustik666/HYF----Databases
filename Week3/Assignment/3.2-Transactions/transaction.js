import { connection } from './db.js';

connection.config.database = 'bank';

connection.connect();

connection.query('START TRANSACTION', (err) => {
  if (err) throw err;

  console.log('START TRANSACTION');
});

const deductAmount = `UPDATE account SET balance = balance - 1000 WHERE account_number = 101`;
connection.query(deductAmount, (err, results) => {
  if (err) {
    return connection.query('ROLLBACK', () => {
      throw err;
    });
  }
});

const addAmount = `UPDATE account SET balance = balance + 1000 WHERE account_number = 102`;
connection.query(addAmount, (err, results) => {
  if (err) {
    return connection.query('ROLLBACK', () => {
      throw err;
    });
  }
});

const logChange101 = `INSERT INTO account_changes (account_number, amount, changed_date, remark) 
                      VALUES (101, -1000.00, NOW(), 'Transfer to account 102')`;
connection.query(logChange101, (err, results) => {
  if (err) {
    return connection.query('ROLLBACK', () => {
      throw err;
    });
  }
});

const logChange102 = `INSERT INTO account_changes (account_number, amount, changed_date, remark) 
                      VALUES (102, 1000.00, NOW(), 'Transfer from account 101')`;
connection.query(logChange102, (err, results) => {
  if (err) {
    return connection.query('ROLLBACK', () => {
      throw err;
    });
  }
});

connection.query('COMMIT', (err) => {
  if (err) {
    return connection.query('ROLLBACK', () => {
      throw err;
    });
  }

  console.log('Transaction completed');
});

connection.end();