const mysql = require('mysql2');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world'
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');
  
  // 1. What are the names of countries with population greater than 8 million?
  connection.query('SELECT Name FROM country WHERE Population > 8000000', function (err, results) {
    if (err) throw err;
    console.log('1. Countries with population greater than 8 million:');
    console.log(results);
  });

  // 2. What are the names of countries that have “land” in their names?
  connection.query('SELECT Name FROM country WHERE Name LIKE "%land%"', function (err, results) {
    if (err) throw err;
    console.log('2. Countries with "land" in their names:');
    console.log(results);
  });

  // 3. What are the names of the cities with population in between 500,000 and 1 million?
  connection.query('SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000', function (err, results) {
    if (err) throw err;
    console.log('3. Cities with population in between 500,000 and 1 million:');
    console.log(results);
  });

  // 4. What's the name of all the countries on the continent ‘Europe’?
  connection.query('SELECT Name FROM country WHERE Continent = "Europe"', function (err, results) {
    if (err) throw err;
    console.log('4. Countries on the continent "Europe":');
    console.log(results);
  });

  // 5. List all countries in descending order of their surface areas
  connection.query('SELECT Name FROM country ORDER BY SurfaceArea DESC', function (err, results) {
    if (err) throw err;
    console.log('5. Countries in descending order of their surface areas:');
    console.log(results);
  });

  // 6. What are the names of all the cities in the Netherlands?
  connection.query('SELECT Name FROM city WHERE CountryCode = "NLD"', function (err, results) {
    if (err) throw err;
    console.log('6. Cities in the Netherlands:');
    console.log(results);
  });

  // 7. What is the population of Rotterdam?
  connection.query('SELECT Population FROM city WHERE Name = "Rotterdam"', function (err, results) {
    if (err) throw err;
    console.log('7. Population of Rotterdam:');
    console.log(results[0].Population);
  });

  // 8. What's the top 10 countries by Surface Area?
  connection.query('SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10', function (err, results) {
    if (err) throw err;
    console.log('8. Top 10 countries by Surface Area:');
    console.log(results);
  });

  // 9. What's the top 10 most populated cities?
  connection.query('SELECT Name FROM city ORDER BY Population DESC LIMIT 10', function (err, results) {
    if (err) throw err;
    console.log('9. Top 10 most populated cities:');
    console.log(results);
  });

  // 10. What is the population number of the world?
  connection.query('SELECT SUM(Population) AS WorldPopulation FROM country', function (err, results) {
    if (err) throw err;
    console.log('10. Population number of the world:');
    console.log(results[0].WorldPopulation);
  });

  // Close the connection
  connection.end();
});