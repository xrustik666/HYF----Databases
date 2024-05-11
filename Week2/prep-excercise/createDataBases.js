import { insertData } from './insertQueries.js';
import { connection } from './dbConnection.js';

export function createDatabase() {
  connection.query("DROP DATABASE IF EXISTS recipes", function (err, result) {
    if (err) {
      throw err;
    }

    console.log("Database dropped successfully");

    connection.query("CREATE DATABASE recipes", function (err, result) {
      if (err) {
        throw err;
      }
      
      console.log("Database created successfully");
      useDatabase();
    });
  });
}

// Function to use the meetup database
function useDatabase(callback) {
  connection.query("USE recipes", function (err, result) {
    if (err) throw err;
    console.log("Using recipes database");
    createTables(callback);
  });
}

// Function to create tables
function createTables(callback) {
  const createRecipesTable = `CREATE TABLE IF NOT EXISTS Recipes (
    recipeId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
  )`;
  
  const createCategoriesTable = `CREATE TABLE IF NOT EXISTS Categories (
    categoryId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
  )`;

  const createIngredientsTable = `CREATE TABLE IF NOT EXISTS Ingredients (
    ingredientId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
  )`;

  const createStepsTable = `CREATE TABLE Steps (
    stepId INT PRIMARY KEY AUTO_INCREMENT,
    description TEXT NOT NULL
  )`;
  
  const createRecipeCategoriesTable = `CREATE TABLE IF NOT EXISTS RecipeCategories (
    recipeId INT,
    categoryId INT,
    FOREIGN KEY (recipeId) REFERENCES Recipes(recipeId),
    FOREIGN KEY (categoryId) REFERENCES Categories(categoryId),
    PRIMARY KEY (recipeId, categoryId)
  )`;

  const createRecipeIngredientsTable = `CREATE TABLE IF NOT EXISTS RecipeIngredients (
    recipeId INT,
    ingredientId INT,
    FOREIGN KEY (recipeId) REFERENCES Recipes(recipeId),
    FOREIGN KEY (ingredientId) REFERENCES Ingredients(ingredientId),
    PRIMARY KEY (recipeId, ingredientId)
  )`;

  const createRecipeStepsTable = `CREATE TABLE IF NOT EXISTS RecipeSteps (
    recipeId INT,
    stepId INT,
    FOREIGN KEY (recipeId) REFERENCES Recipes(recipeId),
    FOREIGN KEY (stepId) REFERENCES Steps(stepId),
    PRIMARY KEY (recipeId, stepId)
  )`;

  connection.query(createRecipesTable, function (err, result) {
    if (err) throw err;
    console.log("Recipes table created successfully");
  });
  
  connection.query(createCategoriesTable, function (err, result) {
    if (err) throw err;
    console.log("Categories table created successfully");
  });
  
  connection.query(createIngredientsTable, function (err, result) {
    if (err) throw err;
    console.log("Ingredients table created successfully");
  });

  connection.query(createStepsTable, function (err, result) {
    if (err) throw err;
    console.log("Steps table created successfully");
  });

  connection.query(createRecipeCategoriesTable, function (err, result) {
    if (err) throw err;
    console.log("RecipeCategories table created successfully");
  });

  connection.query(createRecipeIngredientsTable, function (err, result) {
    if (err) throw err;
    console.log("RecipeIngredients table created successfully");
  });

  connection.query(createRecipeStepsTable, function (err, result) {
    if (err) throw err;
    console.log("RecipeSteps table created successfully");
  });

  insertData(callback);
}

