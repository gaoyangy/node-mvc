const Message = require('../models/message');
const Utils = require('../utils/utils');
exports.saveMsg = async function (userInfo,fn){
  userInfo.create_time = Utils.Dates.Format("yyyy-MM-dd hh:mm:ss");
  let data = await Message.saveMsg(userInfo);
  if (data) {
    fn(data)
  } else {
    fn({error:1})
  }
};
exports.updateUserLogin = async function (userInfo, fn){
  let login_time = Utils.Dates.Format("yyyy-MM-dd hh:mm:ss");
  let data = await Message.updateUserLogin(userInfo,login_time);
  if (data) {
    fn(true)
  } else {
    fn({error:1})
  }
};
exports.updateUserLogin = async function (userInfo, fn){
  let login_time = Utils.Dates.Format("yyyy-MM-dd hh:mm:ss");
  let data = await Message.updateUserLogin(userInfo,login_time);
  let getlist = await Message.messageLst(login_time)
  if (data && getlist) {
    fn(getlist)
  } else {
    fn({error:1})
  }
};
exports.getHistoryMsg = async function (userInfo, fn){
  let login_time = Utils.Dates.Format("yyyy-MM-dd hh:mm:ss");
  let data = await Message.updateUserLogin(userInfo,login_time);
  if (data) {
    fn(true)
  } else {
    fn({error:1})
  }
};