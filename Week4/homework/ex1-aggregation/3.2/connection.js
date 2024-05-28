import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.MONGODB_DB;
const collectionName = process.env.MONGODB_COLLECTION;
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

const database = client.db(dbName);
const collection = database.collection(collectionName);

// Connection to database
async function connectDb() {
  try {
    await client.connect();
    console.log('Connected to database');
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }
}

export { connectDb, client, collection };