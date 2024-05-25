import { recipes, categories, ingredients, steps, recipeCategories, recipeIngredients, recipeSteps } from './data.js';

async function insertData(db) {
  await db.collection('Recipes').insertMany(recipes.map(function (recipe) {
    return { name: recipe.recipeName }
  }));
  console.log("Recipes inserted successfully");

  await db.collection('Categories').insertMany(categories.map(function(category) {
    return { name: category.categoryName };
  }));
  console.log("Categories inserted successfully");

  await db.collection('Ingredients').insertMany(ingredients.map(function (ingredient) {
    return { name: ingredient.ingredientName }
  }));
  console.log("Ingredients inserted successfully");

  await db.collection('Steps').insertMany(steps.map(function (step) {
    return { description: step.stepDescription }
  }));
  console.log("Steps inserted successfully");

  await db.collection('RecipeCategories').insertMany(recipeCategories);
  console.log("RecipeCategories inserted successfully");

  await db.collection('RecipeIngredients').insertMany(recipeIngredients);
  console.log("RecipeIngredients inserted successfully");

  await db.collection('RecipeSteps').insertMany(recipeSteps);
  console.log("RecipeSteps inserted successfully");
}

export { insertData };