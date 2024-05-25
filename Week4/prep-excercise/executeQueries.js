import { getDb } from './dbConnection.js';

export async function executeQueries() {
  const db = await getDb();

  const query1 = await db.collection('Recipes').aggregate([
    { $lookup: { from: 'RecipeCategories', localField: 'recipeId', foreignField: 'recipeId', as: 'recipeCategories' } },
    { $lookup: { from: 'Categories', localField: 'recipeCategories.categoryId', foreignField: 'categoryId', as: 'categories' } },
    { $lookup: { from: 'RecipeIngredients', localField: 'recipeId', foreignField: 'recipeId', as: 'recipeIngredients' } },
    { $lookup: { from: 'Ingredients', localField: 'recipeIngredients.ingredientId', foreignField: 'ingredientId', as: 'ingredients' } },
    { $match: { 'categories.name': 'Vegetarian', 'ingredients.name': 'Potatoes' } },
    { $project: { name: 1 } }
  ]).toArray();

  console.log("Query 1 results:", query1);

  const query2 = await db.collection('Recipes').aggregate([
    { $lookup: { from: 'RecipeCategories', localField: 'recipeId', foreignField: 'recipeId', as: 'recipeCategories' } },
    { $lookup: { from: 'Categories', localField: 'recipeCategories.categoryId', foreignField: 'categoryId', as: 'categories' } },
    { $match: { 'categories.name': 'Cake' } },
    { $lookup: { from: 'RecipeSteps', localField: 'recipeId', foreignField: 'recipeId', as: 'recipeSteps' } },
    { $lookup: { from: 'Steps', localField: 'recipeSteps.stepId', foreignField: 'stepId', as: 'steps' } },
    { $match: { 'steps.description': { $regex: 'No-Bake' } } },
    { $project: { name: 1 } }
  ]).toArray();

  console.log("Query 2 results:", query2);

  const query3 = await db.collection('Recipes').aggregate([
    { $lookup: { from: 'RecipeCategories', localField: 'recipeId', foreignField: 'recipeId', as: 'recipeCategories' } },
    { $lookup: { from: 'Categories', localField: 'recipeCategories.categoryId', foreignField: 'categoryId', as: 'categories' } },
    { $match: { 'categories.name': { $in: ['Vegan', 'Japanese'] } } },
    { $group: { _id: '$name', count: { $sum: 1 } } },
    { $match: { count: 2 } },
    { $project: { name: 1 } }
  ]).toArray();
  
  console.log("Query 3 results:", query3);
}