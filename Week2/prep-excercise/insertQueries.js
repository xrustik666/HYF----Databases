import { recipes, categories, ingredients, steps, recipeCategories, recipeIngredients, recipeSteps } from './data.js';
import { connection } from './dbConnection.js';

// Insert data into Recipes
function insertRecipes() {
  recipes.forEach(recipe => {
      connection.query("INSERT INTO Recipes (name) VALUES (?)", [recipe.recipeName], function (err, result) {
          if (err) throw err;
          console.log("Recipe inserted successfully");
      });
  });
}

// Insert data into Categories
function insertCategories() {
  categories.forEach(category => {
      connection.query("INSERT INTO Categories (name) VALUES (?)", [category.categoryName], function (err, result) {
          if (err) throw err;
          console.log("Category inserted successfully");
      });
  });
}

// Insert data into Ingredients
function insertIngredients() {
  ingredients.forEach(ingredient => {
      connection.query("INSERT INTO Ingredients (name) VALUES (?)", [ingredient.ingredientName], function (err, result) {
          if (err) throw err;
          console.log("Ingredient inserted successfully");
      });
  });
}

// Insert data into Steps
function insertSteps() {
  steps.forEach(step => {
      connection.query("INSERT INTO Steps (description) VALUES (?)", [step.stepDescription], function (err, result) {
          if (err) throw err;
          console.log("Step inserted successfully");
      });
  });
}

// Insert data into RecipeCategories
function insertRecipeCategories() {
  recipeCategories.forEach(recipeCategory => {
      connection.query("INSERT INTO RecipeCategories (recipeId, categoryId) VALUES (?, ?)", [recipeCategory.recipeId, recipeCategory.categoryId], function (err, result) {
          if (err) throw err;
          console.log("RecipeCategory inserted successfully");
      });
  });
}

// Insert data into RecipeIngredients
function insertRecipeIngredients() {
  recipeIngredients.forEach(recipeIngredient => {
      connection.query("INSERT INTO RecipeIngredients (recipeId, ingredientId) VALUES (?, ?)", [recipeIngredient.recipeId, recipeIngredient.ingredientId], function (err, result) {
          if (err) throw err;
          console.log("RecipeIngredient inserted successfully");
      });
  });
}

// Insert data into RecipeSteps
function insertRecipeSteps() {
  recipeSteps.forEach(recipeStep => {
      connection.query("INSERT INTO RecipeSteps (recipeId, stepId) VALUES (?, ?)", [recipeStep.recipeId, recipeStep.stepId], function (err, result) {
          if (err) throw err;
          console.log("RecipeStep inserted successfully");
      });
  });
}

// Function to insert data into tables
export function insertData() {
  insertRecipes();
  insertCategories();
  insertIngredients();
  insertSteps();
  insertRecipeCategories();
  insertRecipeIngredients();
  insertRecipeSteps();
}