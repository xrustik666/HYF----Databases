import { connectDb, collection } from './connection.js';
import fs from 'fs';
import csv from 'csv-parser';

// 1. Inserts data from csv to database
async function insertData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream('../population_pyramid_1950-2022.csv')
    .pipe(csv())
    .on('data', (row) => {
      const document = {
        Country: row.Country,
        Year: parseInt(row.Year),
        Age: row.Age,
        M: parseInt(row.M),
        F: parseInt(row.F)
      };

      console.log('Inserting document:', document);

      collection.insertOne(document, (err, res) => {
        if (err) {
          console.error('Error inserting document:', err);
          reject(err);
        } else {
          console.log('Document inserted:', res.insertedId);
        }
      });
    })
    .on('end', () => {
      console.log('Data from .csv file successfully extracted');
      resolve();
    })
    .on('error', (err) => {
      console.error('Error reading CSV file:', err);
      reject(err);
    });
  });
}

// 2. Returns the array of the total population (M + F over all age groups) for a given `Country` per year
async function getPopulationByCountry(country) {
  try {
    const pipeline = [
      { $match: { Country: country } },
      {
        $group: {
          _id: "$Year",
          countPopulation: { $sum: { $add: ["$M", "$F"] } }
        }
      },
      { $sort: { _id: 1 } }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    
    console.log(result);
    return result;
  } catch (err) {
    console.error('Error getting total population by country:', err);
  }
}

// 3. Returns all the information of each continent for a given `Year` and `Age` field but add a new field `TotalPopulation` that will be the addition of `M` and `F`
async function getPopulationByYearAndAge(year, age) {
  try {
    const pipeline = [
      { $match: { Year: year, Age: age } },
      {
        $addFields: {
          TotalPopulation: { $add: ["$M", "$F"] }
        }
      }
    ];

    const result = await collection.aggregate(pipeline).toArray();

    console.log(result);
    return result;
  } catch (err) {
    console.error('Error getting population by year and age:', err);
  }
}

// Launching all functions
function main() {
  connectDb();
  insertData();
  getPopulationByCountry('Afghanistan');
  getPopulationByYearAndAge(1950, '95-99')
}

main();