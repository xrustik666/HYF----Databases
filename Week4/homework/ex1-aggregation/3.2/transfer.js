import { connectDb, collection, client } from './connection.js';

connectDb();

async function transfer(fromAccountNumber, toAccountNumber, amount, remark) {
  try {
    const session = client.startSession();
    session.startTransaction();

    try {
      const fromAccount = await collection.findOne({ account_number: fromAccountNumber });
      const toAccount = await collection.findOne({ account_number: toAccountNumber });

      if (!fromAccount || !toAccount) {
        throw new Error('Account not found');
      }

      // Balance checking
      if (fromAccount.balance < amount) {
        throw new Error('Insufficient funds');
      }

      // Balances updating
      await collection.updateOne(
        { account_number: fromAccountNumber },
        { $inc: { balance: -amount } }
      );

      await collection.updateOne(
        { account_number: toAccountNumber },
        { $inc: { balance: amount } }
      );

      // Getting changes index
      const fromChangeNumber = fromAccount.account_changes.length + 1;
      const toChangeNumber = toAccount.account_changes.length + 1;

      await collection.updateOne(
        { account_number: fromAccountNumber },
        {
          $push: {
            account_changes: {
              change_number: fromChangeNumber,
              amount: -amount,
              changed_date: new Date(),
              remark: `Transfer to account ${toAccountNumber}`
            }
          }
        }
      );

      await collection.updateOne(
        { account_number: toAccountNumber },
        {
          $push: {
            account_changes: {
              change_number: toChangeNumber,
              amount: amount,
              changed_date: new Date(),
              remark: `Transfer from account ${fromAccountNumber}`
            }
          }
        }
      );

      await session.commitTransaction();
      console.log('Transaction completed');
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

transfer(101, 102, 1000, 'Transfer for test');