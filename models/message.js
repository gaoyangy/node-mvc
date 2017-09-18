var db = require('../config/database');
exports.saveMsg = (userInfo) => {
  let sql = `INSERT INTO message  (uuid, msg,create_time) VALUES  (${userInfo.uuid},'${userInfo.message}','${userInfo.create_time}')`
  return new Promise((resolve, reject) => {
    db.getConnection(function(err, connection) {
      if (err) {
        reject(err);
      }
      // make the query
      connection.query(sql, function(err, results) {
          if (err) {
            reject(err);
          }else {
            results.status = true
            resolve(results);
          }
      });
  });
  });
}//updateUserLogin
exports.updateUserLogin = (userInfo,login_time) => {
  let sql = `UPDATE im SET login_time = '${login_time}' WHERE uuid = '${userInfo.uuid}'`
  //let sql = `INSERT INTO im  (uuid, msg,create_time) VALUES  (${userInfo.uuid},'${userInfo.message}','${userInfo.create_time}')`
  return new Promise((resolve, reject) => {
    db.getConnection(function(err, connection) {
      if (err) {
        reject(err);
      }
      // make the query
      connection.query(sql, function(err, results) {
          if (err) {
            reject(err);
          }else {
            results.status = true
            resolve(results);
          }
      });
  });
  });
}
exports.messageLst = (login_time) => {
  let sql = `SELECT i.user_name,m.* FROM im i LEFT JOIN message m on i.uuid=m.uuid  WHERE create_time<'${login_time}'`
  //let sql = `UPDATE im SET login_time = '${login_time}' WHERE uuid = '${userInfo.uuid}'`
  //let sql = `INSERT INTO im  (uuid, msg,create_time) VALUES  (${userInfo.uuid},'${userInfo.message}','${userInfo.create_time}')`
  return new Promise((resolve, reject) => {
    db.getConnection(function(err, connection) {
      if (err) {
        reject(err);
      }
      // make the query
      connection.query(sql, function(err, results) {
          if (err) {
            reject(err);
          }else {
            results.status = true
            resolve(results);
          }
      });
  });
  });
}