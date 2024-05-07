const mysql = require('mysql2');

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
  connection.query("DROP DATABASE IF EXISTS meetup", function (err, result) {
    if (err) {
      throw err;
    }

    console.log("Database dropped successfully");

    connection.query("CREATE DATABASE meetup", function (err, result) {
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
  connection.query("USE meetup", function (err, result) {
    if (err) throw err;
    console.log("Using meetup database");
    createTables();
  });
}

// Function to create tables
function createTables() {
  const createInviteeTable = `CREATE TABLE Invitee (
    invitee_no INT AUTO_INCREMENT PRIMARY KEY,
    invitee_name VARCHAR(255),
    invited_by VARCHAR(255)
  )`;
  
  const createRoomTable = `CREATE TABLE Room (
    room_no INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(255),
    floor_number INT
  )`;
  
  const createMeetingTable = `CREATE TABLE Meeting (
    meeting_no INT AUTO_INCREMENT PRIMARY KEY,
    meeting_title VARCHAR(255),
    starting_time DATETIME,
    ending_time DATETIME,
    room_no INT,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
  )`;
  
  connection.query(createInviteeTable, function (err, result) {
    if (err) throw err;
    console.log("Invitee table created successfully");
  });
  
  connection.query(createRoomTable, function (err, result) {
    if (err) throw err;
    console.log("Room table created successfully");
  });
  
  connection.query(createMeetingTable, function (err, result) {
    if (err) throw err;
    console.log("Meeting table created successfully");
    insertData();
  });
}

// Function to insert data into tables
function insertData() {
  const invitees = [
    { invitee_name: 'John Conor', invited_by: 'Sarah Conor' },
    { invitee_name: 'Alice Johnson', invited_by: 'Bob Brown' },
    { invitee_name: 'Emma Lee', invited_by: 'Sam Wilson' },
    { invitee_name: 'Michael Clark', invited_by: 'Sarah Adams' },
    { invitee_name: 'Sophia Garcia', invited_by: 'David Martinez' }
  ];
  
  const rooms = [
    { room_name: 'Conference Room 1', floor_number: 1 },
    { room_name: 'Conference Room 2', floor_number: 2 },
    { room_name: 'Boardroom', floor_number: 3 },
    { room_name: 'Training Room', floor_number: 1 },
    { room_name: 'Meeting Room', floor_number: 2 }
  ];

  const meetings = [
    { meeting_title: 'Project Kickoff', starting_time: '2024-05-07 09:00:00', ending_time: '2024-05-07 11:00:00', room_no: 1 },
    { meeting_title: 'Team Review', starting_time: '2024-05-08 14:00:00', ending_time: '2024-05-08 16:00:00', room_no: 2 },
    { meeting_title: 'Client Presentation', starting_time: '2024-05-09 10:00:00', ending_time: '2024-05-09 12:00:00', room_no: 3 },
    { meeting_title: 'Training Session', starting_time: '2024-05-10 13:00:00', ending_time: '2024-05-10 15:00:00', room_no: 4 },
    { meeting_title: 'Monthly Review', starting_time: '2024-05-11 11:00:00', ending_time: '2024-05-11 13:00:00', room_no: 5 }
  ];

  // Inserting data into Invitee table
  const insertInviteeQuery = "INSERT INTO Invitee (invitee_name, invited_by) VALUES ?";
  connection.query(insertInviteeQuery, [invitees.map(invitee => [invitee.invitee_name, invitee.invited_by])], function (err, result) {
    if (err) throw err;
    console.log("Data inserted into Invitee table");
  });

  // Inserting data into Room table
  const insertRoomQuery = "INSERT INTO Room (room_name, floor_number) VALUES ?";
  connection.query(insertRoomQuery, [rooms.map(room => [room.room_name, room.floor_number])], function (err, result) {
    if (err) throw err;
    console.log("Data inserted into Room table");
  });

  // Inserting data into Meeting table  
  const insertMeetingQuery = "INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ?";
  connection.query(insertMeetingQuery, [meetings.map(meeting => [meeting.meeting_title, meeting.starting_time, meeting.ending_time, meeting.room_no])], function (err, result) {
    if (err) throw err;
    console.log("Data inserted into Meeting table");
  });

  connection.end();
}