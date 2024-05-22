import { createConnection } from 'mysql2';

let connection = createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword'
});

export { connection };