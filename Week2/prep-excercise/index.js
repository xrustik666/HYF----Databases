import mysql from 'mysql2';
import { recipes, categories, ingredients, steps, recipeCategories, recipeIngredients, recipeSteps } from './data.js';

// Database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword'
});

// Create and connect to the meetup database
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL database");
  createDatabase();
});

// Function to create the meetup database
function createDatabase() {
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
function useDatabase() {
  connection.query("USE recipes", function (err, result) {
    if (err) throw err;
    console.log("Using recipes database");
    createTables();
  });
}

// Function to create tables
function createTables() {
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

  insertData();
}

// Function to insert data into tables
function insertData() {
  // Inserting data into table Recipes
  recipes.forEach(recipe => {
    connection.query("INSERT INTO Recipes (name) VALUES (?)", [recipe.recipeName], function (err, result) {
      if (err) throw err;
      console.log("Recipe inserted successfully");
    });
  });

  // Inserting data into table Categories
  categories.forEach(category => {
    connection.query("INSERT INTO Categories (name) VALUES (?)", [category.categoryName], function (err, result) {
      if (err) throw err;
      console.log("Category inserted successfully");
    });
  });

  // Inserting data into table Ingredients
  ingredients.forEach(ingredient => {
    connection.query("INSERT INTO Ingredients (name) VALUES (?)", [ingredient.ingredientName], function (err, result) {
      if (err) throw err;
      console.log("Ingredient inserted successfully");
    });
  });

  // Inserting data into table Steps
  steps.forEach(step => {
    connection.query("INSERT INTO Steps (description) VALUES (?)", [step.stepDescription], function (err, result) {
      if (err) throw err;
      console.log("Step inserted successfully");
    });
  });

  // Inserting data into table RecipeCategories
  recipeCategories.forEach(recipeCategory => {
    connection.query("INSERT INTO RecipeCategories (recipeId, categoryId) VALUES (?, ?)", [recipeCategory.recipeId, recipeCategory.categoryId], function (err, result) {
      if (err) throw err;
      console.log("RecipeCategory inserted successfully");
    });
  });

  // Inserting data into table RecipeIngredients
  recipeIngredients.forEach(recipeIngredient => {
    connection.query("INSERT INTO RecipeIngredients (recipeId, ingredientId) VALUES (?, ?)", [recipeIngredient.recipeId, recipeIngredient.ingredientId], function (err, result) {
      if (err) throw err;
      console.log("RecipeIngredient inserted successfully");
    });
  });

  // Inserting data into table RecipeSteps
  recipeSteps.forEach(recipeStep => {
    connection.query("INSERT INTO RecipeSteps (recipeId, stepId) VALUES (?, ?)", [recipeStep.recipeId, recipeStep.stepId], function (err, result) {
      if (err) throw err;
      console.log("RecipeStep inserted successfully");
    });
  });

  // Get all the vegetarian recipes with potatoes
  const query1 = `
    SELECT r.name
    FROM Recipes r
    JOIN RecipeCategories rc ON r.recipeId = rc.recipeId
    JOIN Categories c ON rc.categoryId = c.categoryId
    JOIN RecipeIngredients ri ON r.recipeId = ri.recipeId
    JOIN Ingredients i ON ri.ingredientId = i.ingredientId
    WHERE c.name = 'Vegetarian'
    AND i.name = 'Potatoes';
  `;

  // SQL queries
  // Get all the cakes that do not need baking
  const query2 = `
    SELECT r.name
    FROM Recipes r
    JOIN RecipeCategories rc ON r.recipeId = rc.recipeId
    JOIN Categories c ON rc.categoryId = c.categoryId
    WHERE c.name = 'Cake'
    AND r.name IN (
        SELECT r.name
        FROM Recipes r
        JOIN RecipeSteps rs ON r.recipeId = rs.recipeId
        JOIN Steps s ON rs.stepId = s.stepId
        WHERE s.description LIKE '%No-Bake%'
    );
  `;

  // Get all the vegan and Japanese recipes
  const query3 = `
    SELECT r.name
    FROM Recipes r
    JOIN RecipeCategories rc ON r.recipeId = rc.recipeId
    JOIN Categories c ON rc.categoryId = c.categoryId
    WHERE c.name IN ('Vegan', 'Japanese')
    GROUP BY r.name
    HAVING COUNT(DISTINCT c.name) = 2;
  `;

  // Execute the SQL queries
  connection.query(query1, function (err, results) {
    if (err) throw err;
    console.log("Query 1 results:", results);
  });

  connection.query(query2, function (err, results) {
    if (err) throw err;
    console.log("Query 2 results:", results);
  });

  connection.query(query3, function (err, results) {
    if (err) throw err;
    console.log("Query 3 results:", results);
  });

  connection.end();
}

