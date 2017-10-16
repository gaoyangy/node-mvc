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
                    } else {
                        results.status = true
                        resolve(results);
                    }
                });
            });
        });
    } //updateUserLogin
exports.updateUserLogin = (userInfo, login_time) => {
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
                    } else {
                        results.status = true
                        resolve(results);
                    }
                });
            });
        });
    } //updateUserLogout
exports.updateUserLogout = (userInfo) => {
    let sql = `INSERT INTO usertime  (uuid,status_id,update_time) VALUES  (${userInfo.uuid},'${userInfo.status_id}','${userInfo.update_time}')`
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
                } else {
                    results.status = true
                    resolve(results);
                }
            });
            connection.release();
        });
    });
}
exports.messageLst = (update_time) => {
        let sql = `SELECT i.user_name,m.* FROM im i right JOIN message m on i.uuid=m.uuid ORDER BY id DESC limit 10`
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
                    } else {
                        results.status = true
                        resolve(results);
                    }
                });
            });
        });
    }
    //
exports.getMsgList = (prams, new_time) => {
    let sql = `SELECT i.user_name,m.* FROM im i RIGHT JOIN message m on i.uuid=m.uuid  where ORDER BY id DESC limit 3`
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
                } else {
                    results.status = true
                    resolve(results);
                }
            });
        });
    });
}