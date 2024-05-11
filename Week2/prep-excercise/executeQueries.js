import { connection } from './dbConnection.js';

// Execute SQL queries
export function executeQueries() {
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

  const query3 = `
      SELECT r.name
      FROM Recipes r
      JOIN RecipeCategories rc ON r.recipeId = rc.recipeId
      JOIN Categories c ON rc.categoryId = c.categoryId
      WHERE c.name IN ('Vegan', 'Japanese')
      GROUP BY r.name
      HAVING COUNT(DISTINCT c.name) = 2;
  `;

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
      connection.end();
  });
}