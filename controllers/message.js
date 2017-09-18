const Message = require('../models/message');
const Utils = require('../utils/utils');
exports.saveMsg = async function(userInfo, fn) {
    userInfo.create_time = Utils.Dates.Format("yyyy-MM-dd hh:mm:ss");
    let data = await Message.saveMsg(userInfo);
    if (data) {
        fn(data)
    } else {
        fn({ error: 1 })
    }
};
exports.updateUserLogout = async function(userInfo, status_id, fn) {
    let update_time = Utils.Dates.Format("yyyy-MM-dd hh:mm:ss");
    userInfo.update_time = update_time
    if (status_id) {
        userInfo.status_id = status_id
    }
    userInfo.status_id = 0
    let data = await Message.updateUserLogout(userInfo);
    if (data) {
        fn(true)
    } else {
        fn({ error: 1 })
    }
}; //updateUserLogout
exports.updateUserLogin = async function(userInfo, fn) {
    let update_time = Utils.Dates.Format("yyyy-MM-dd hh:mm:ss");
    userInfo.status_id = 1
    userInfo.update_time = update_time
    let data = await Message.updateUserLogout(userInfo, function(data) {
        console.log(data)
    });
    let getlist = await Message.messageLst(update_time)
    if (data && getlist) {
        fn(getlist)
    } else {
        fn({ error: 1 })
    }
};
exports.getHistoryMsg = async function(userInfo, fn) {
    let login_time = Utils.Dates.Format("yyyy-MM-dd hh:mm:ss");
    let data = await Message.updateUserLogin(userInfo, login_time);
    if (data) {
        fn(true)
    } else {
        fn({ error: 1 })
    }
};