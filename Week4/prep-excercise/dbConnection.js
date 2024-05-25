import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DB;

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();

    console.log("Connected to MongoDB database");
  } catch (err) {
    console.error(err);
  }
}

async function getDb() {
  return client.db(dbName);
}

export { client, connect, getDb };