const Message = require('../models/message');
const Utils = require('../utils/utils');
exports.getMsgList = async function(req, res) {
    let new_time = Utils.Dates.Format("yyyy-MM-dd hh:mm:ss");
    let data = await Message.getMsgList(req.body, new_time);
    if (data) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        data.forEach(function(element) {
            element.create_time = new Date(element.create_time).Format("yyyy-MM-dd hh:mm:ss")
        }, this);
        //let tpl = render.viewEngine('index.html', {})
        res.end(JSON.stringify(data));
    } else {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        //let tpl = render.viewEngine('index.html', {})
        res.end(JSON.stringify({ error: 1 }));
    }
};
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
    getlist.forEach(function(element) {
        element.create_time = new Date(element.create_time).Format("yyyy-MM-dd hh:mm:ss")
    }, this);
<<<<<<< Updated upstream
    if (data && getlist) {
        fn(getlist.reverse())
=======
    let list = getlist.sort((elem, relem) => {
        return elem.id - relem.id
    })
    if (data && list) {
        fn(list)
>>>>>>> Stashed changes
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