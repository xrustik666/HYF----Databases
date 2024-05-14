import mysql from 'mysql2';

// Database connection configuration
export const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
  }
);