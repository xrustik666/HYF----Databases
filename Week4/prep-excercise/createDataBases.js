import { connect, getDb } from './dbConnection.js';
import { insertData } from './insertQueries.js';

export async function createDatabase() {
  await connect();
  
  const db = await getDb();

  console.log("Database created successfully");

  await createCollections(db);
  await insertData(db);
}

async function createCollections(db) {
  await db.createCollection("Recipes");
  await db.createCollection("Categories");
  await db.createCollection("Ingredients");
  await db.createCollection("Steps");
  await db.createCollection("RecipeCategories");
  await db.createCollection("RecipeIngredients");
  await db.createCollection("RecipeSteps");
  console.log("Collections created successfully");
}