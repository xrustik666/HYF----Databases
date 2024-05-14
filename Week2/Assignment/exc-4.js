import { connection } from './dbConnection.js';

// Connect to the database and select the database
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL database");

  connection.query("USE assignmentDB", function (err, result) {
    if (err) throw err;
    console.log("Using assignmentDB database");
    performQueries();
  });
});

// Function to perform the required queries
function performQueries() {
  // Query to retrieve all research papers and the number of authors that wrote each paper
  const queryPaperAuthorsCount = `
    SELECT rp.paper_title, COUNT(arp.author_id) AS num_authors
    FROM research_papers rp
    LEFT JOIN author_research_papers arp ON rp.paper_id = arp.paper_id
    GROUP BY rp.paper_id;
  `;

  connection.query(queryPaperAuthorsCount, function (err, results) {
    if (err) throw err;
    console.log("Research papers and the number of authors for each paper:");
    console.table(results);
  });

  // Query to retrieve the sum of research papers published by all female authors
  const querySumPapersByFemaleAuthors = `
    SELECT COUNT(rp.paper_id) AS total_papers
    FROM research_papers rp
    INNER JOIN author_research_papers arp ON rp.paper_id = arp.paper_id
    INNER JOIN authors a ON arp.author_id = a.author_id
    WHERE a.gender = 'F';
  `;

  connection.query(querySumPapersByFemaleAuthors, function (err, results) {
    if (err) throw err;
    console.log("Sum of research papers published by all female authors:");
    console.table(results);
  });

  // Query to retrieve the average h-index of all authors per university
  const queryAvgHIndexPerUniversity = `
    SELECT university, AVG(h_index) AS avg_h_index
    FROM authors
    GROUP BY university;
  `;

  connection.query(queryAvgHIndexPerUniversity, function (err, results) {
    if (err) throw err;
    console.log("Average h-index of all authors per university:");
    console.table(results);
  });

  // Query to retrieve the sum of research papers of the authors per university
  const querySumPapersPerUniversity = `
    SELECT university, COUNT(arp.paper_id) AS total_papers
    FROM author_research_papers arp
    INNER JOIN authors a ON arp.author_id = a.author_id
    GROUP BY university;
  `;

  connection.query(querySumPapersPerUniversity, function (err, results) {
    if (err) throw err;
    console.log("Sum of research papers of the authors per university:");
    console.table(results);
  });

  // Query to retrieve the minimum and maximum h-index of all authors per university
  const queryMinMaxHIndexPerUniversity = `
    SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
    FROM authors
    GROUP BY university;
  `;

  connection.query(queryMinMaxHIndexPerUniversity, function (err, results) {
    if (err) throw err;
    console.log("Minimum and maximum h-index of all authors per university:");
    console.table(results);
    connection.end();
  });
}