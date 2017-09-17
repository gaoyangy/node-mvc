var db = require('../config/database');


exports.find = (id, fn) => {
  let sql = `SELECT * FROM im WHERE uuid =${id}`
  return new Promise((resolve, reject) => {
    db.getConnection(function(err, connection) {
      if (err) {
        reject(err);
      }
      // make the query
      connection.query(sql, function(err, results) {
          if (err) {
            reject(false);
          }else {
            resolve(results);
          }
      })
  })
  })
}
exports.findName = (params, fn) => {
  let sql = `SELECT * FROM im WHERE user_name ='${params.userName}'`
  return new Promise((resolve, reject) => {
    db.getConnection(function(err, connection) {
      if (err) {
        reject(err);
      }
      // make the query
      connection.query(sql, function(err, results) {
          if (err) {
            reject(false);
          }else {
            resolve(results);
          }
      });
  });
  });
}


