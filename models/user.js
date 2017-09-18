var db = require('../config/database');


exports.findId = (id, fn) => {
    let sql = `SELECT * FROM im WHERE uuid =${id}`
    return new Promise((resolve, reject) => {
        db.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            }
            // make the query
            connection.query(sql, function(err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    })
}
exports.findName = (params, fn) => {
    let sql = `SELECT * FROM im WHERE user_name ='${params.user_name}'`
    return new Promise((resolve, reject) => {
        db.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            }
            // make the query
            connection.query(sql, function(err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    });
}

exports.addUser = (params) => {
    let sql = `INSERT INTO im  VALUES  (${params.uuid},'${params.user_name}','${params.password}','${params.login_time}')`
    return new Promise((resolve, reject) => {
        db.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            }
            // make the query
            connection.query(sql, function(err, results) {
                if (err) {
                    reject(err);
                } else {
                    results.status = true
                    resolve(results);
                }
            });
        });
    });
}