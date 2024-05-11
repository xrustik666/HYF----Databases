import mysql from 'mysql2';
import { createDatabase } from './createDataBases.js'

// Database connection configuration
export const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
  }
);