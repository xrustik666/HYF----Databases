import { connection } from './dbConnection.js';

// Connect to the database and select the database
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL database");

  connection.query("USE assignmentDB", function (err, result) {
    if (err) throw err;
    console.log("Using assignmentDB database");
    createTables();
  });
});

// Function to create tables
function createTables() {
  const createAuthorsTable = `CREATE TABLE IF NOT EXISTS authors (
    author_id INT PRIMARY KEY,
    author_name VARCHAR(255),
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT,
    gender CHAR(1),
    mentor INT,
    FOREIGN KEY (mentor) REFERENCES authors(author_id) ON DELETE SET NULL
  )`;

  const createResearchPapersTable = `CREATE TABLE IF NOT EXISTS research_papers (
    paper_id INT PRIMARY KEY,
    paper_title VARCHAR(255),
    conference VARCHAR(255),
    publish_date DATE
  )`;

  const createAuthorResearchPapersTable = `CREATE TABLE IF NOT EXISTS author_research_papers (
    author_id INT,
    paper_id INT,
    PRIMARY KEY (author_id, paper_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
  )`;

  connection.query(createAuthorsTable, function (err, result) {
    if (err) throw err;
    console.log("Authors table created successfully");
  });

  connection.query(createResearchPapersTable, function (err, result) {
    if (err) throw err;
    console.log("Research papers table created successfully");
  });

  connection.query(createAuthorResearchPapersTable, function (err, result) {
    if (err) throw err;
    console.log("Author research papers table created successfully");
    clearTables();
  });
}

// Function to clear tables
function clearTables() {
  connection.query("DELETE FROM author_research_papers", function (err, result) {
    if (err) throw err;
    console.log("Author research papers table cleared");

    connection.query("DELETE FROM research_papers", function (err, result) {
      if (err) throw err;
      console.log("Research papers table cleared");

      connection.query("UPDATE authors SET mentor = NULL", function (err, result) {
        if (err) throw err;
        console.log("Mentor references in authors table cleared");

        connection.query("DELETE FROM authors", function (err, result) {
          if (err) throw err;
          console.log("Authors table cleared");
          insertData();
        });
      });
    });
  });
}

// Function to insert data into tables
function insertData() {
  const authorsData = [
    [1, 'Author 1', 'University A', '1990-01-01', 10, 'M', 1],
    [2, 'Author 2', 'University B', '1991-02-02', 8, 'F', 2],
    [3, 'Author 3', 'University A', '1992-01-01', 7, 'M', 1],
    [4, 'Author 4', 'University B', '1993-02-02', 11, 'F', 2],
    [5, 'Author 5', 'University A', '1994-01-01', 15, 'M', 2],
    [6, 'Author 6', 'University B', '1995-02-02', 18, 'F', 1],
    [7, 'Author 7', 'University A', '1996-01-01', 20, 'M', 2],
    [8, 'Author 8', 'University B', '1997-02-02', 1, 'F', 1],
    [9, 'Author 9', 'University A', '1998-01-01', 2, 'M', 2],
    [10, 'Author 10', 'University B', '1999-02-02', 3, 'F', 2],
    [11, 'Author 11', 'University A', '2000-01-01', 4, 'M', 1],
    [12, 'Author 12', 'University B', '2001-02-02', 5, 'F', 2],
    [13, 'Author 13', 'University A', '2002-01-01', 6, 'M', 1],
    [14, 'Author 14', 'University B', '2003-02-02', 7, 'F', 2],
    [15, 'Author 15', 'University A', '2004-01-01', 9, 'M', 1]
  ];

  const researchPapersData = [
    [1, 'Paper 1', 'Conference X', '2023-01-01'],
    [2, 'Paper 2', 'Conference Y', '2023-02-02'],
    [3, 'Paper 3', 'Conference X', '2023-01-03'],
    [4, 'Paper 4', 'Conference Y', '2023-02-04'],
    [5, 'Paper 5', 'Conference X', '2023-01-05'],
    [6, 'Paper 6', 'Conference Y', '2023-02-06'],
    [7, 'Paper 7', 'Conference X', '2023-01-07'],
    [8, 'Paper 8', 'Conference Y', '2023-02-08'],
    [9, 'Paper 9', 'Conference X', '2023-01-09'],
    [10, 'Paper 10', 'Conference Y', '2023-02-10'],
    [11, 'Paper 11', 'Conference X', '2023-01-11'],
    [12, 'Paper 12', 'Conference Y', '2023-02-12'],
    [13, 'Paper 13', 'Conference X', '2023-01-13'],
    [14, 'Paper 14', 'Conference Y', '2023-02-14'],
    [15, 'Paper 15', 'Conference X', '2023-01-15'],
    [16, 'Paper 16', 'Conference Y', '2023-02-16'],
    [17, 'Paper 17', 'Conference X', '2023-01-17'],
    [18, 'Paper 18', 'Conference Y', '2023-02-18'],
    [19, 'Paper 19', 'Conference X', '2023-01-19'],
    [20, 'Paper 20', 'Conference Y', '2023-02-20'],
    [21, 'Paper 21', 'Conference X', '2023-01-21'],
    [22, 'Paper 22', 'Conference Y', '2023-02-22'],
    [23, 'Paper 23', 'Conference X', '2023-01-23'],
    [24, 'Paper 24', 'Conference Y', '2023-02-24'],
    [25, 'Paper 25', 'Conference X', '2023-01-25'],
    [26, 'Paper 26', 'Conference Y', '2023-02-26'],
    [27, 'Paper 27', 'Conference X', '2023-01-27'],
    [28, 'Paper 28', 'Conference Y', '2023-02-28'],
    [29, 'Paper 29', 'Conference X', '2023-01-29'],
    [30, 'Paper 30', 'Conference Y', '2023-02-28']
  ];

  const authorResearchPapersData = [
    [1, 1], [1, 2],
    [2, 3], [2, 4],
    [3, 5],
    [4, 6], [4, 7],
    [5, 8], [5, 9],
    [6, 10], [6, 11],
    [7, 12],
    [8, 13], [8, 14],
    [9, 15], [9, 16],
    [10, 17], [10, 18],
    [11, 19],
    [12, 20], [12, 21],
    [13, 22], [13, 23],
    [14, 24],
    [15, 25], [15, 26], [15, 27], [15, 28], [15, 29], [15, 30]
  ];

  const insertAuthorsQuery = `INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index, gender, mentor) VALUES ?`;
  const insertResearchPapersQuery = `INSERT INTO research_papers (paper_id, paper_title, conference, publish_date) VALUES ?`;
  const insertAuthorResearchPapersQuery = `INSERT INTO author_research_papers (author_id, paper_id) VALUES ?`;

  connection.query(insertAuthorsQuery, [authorsData], function (err, result) {
    if (err) throw err;
    console.log("Authors data inserted successfully");
  });

  connection.query(insertResearchPapersQuery, [researchPapersData], function (err, result) {
    if (err) throw err;
    console.log("Research papers data inserted successfully");
  });

  connection.query(insertAuthorResearchPapersQuery, [authorResearchPapersData], function (err, result) {
    if (err) throw err;
    console.log("Author research papers data inserted successfully");
    connection.end();
  });
}
