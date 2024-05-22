function getPopulation(Country, name, code, cb) {
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}

// ! Dangerouns value:
// const name = "'; DROP TABLE ${Country}; --";

// Rewritten function to prevent SQL injection. Using prepared statement:
function getPopulationSafe(Country, name, code, cb) {
  const query = 'SELECT Population FROM ?? WHERE Name = ? and code = ?';
  const values = [Country, name, code];

  conn.query(query, values, function (err, result) {
    if (err) return cb(err);
    if (result.length === 0) return cb(new Error("Not found"));
    cb(null, result[0].Population);
  });
}