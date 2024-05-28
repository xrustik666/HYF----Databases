import { connectDb, collection, client } from './connection.js';

connectDb();

async function setup() {
  try {
    // Clearing the collection
    await collection.deleteMany({});

    // Initial data to be inserted
    const accounts = [
      {
        account_number: 101,
        balance: 5000,
        account_changes: [
          { change_number: 1, amount: 5000, changed_date: new Date(), remark: 'Initial deposit' }
        ]
      },
      {
        account_number: 102,
        balance: 3000,
        account_changes: [
          { change_number: 1, amount: 3000, changed_date: new Date(), remark: 'Initial deposit' }
        ]
      }
    ];

    await collection.insertMany(accounts);
    console.log('Inserted initial accounts data');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

setup();