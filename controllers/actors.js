//const actorsTemplate = require('../views/actors-list');
const actorsModel = require('../models/actors');
const User = require('../models/user');
const render = require('../lib/readFile')
const Utils = require('../utils/utils');
exports.getActorByName = async function(req, res) {
    let data = {}
    req.socket.on('display',function(data){
        console.log(data)
    })
    let recv = await User.findName(req.body);
    if (!recv.length) {
        data.msg = '没有此用户！'
        data.error = 1
            //console.log(req, res)
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        //let tpl = render.viewEngine('index.html', {})
        return res.end(JSON.stringify(data));
    }
    if (req.body.user_name === recv[0].user_name) {
        if (req.body.password !== recv[0].password) {
            data.msg = '密码错误！'
            data.error = 1
        } else {
            data.msg = '登陆成功！'
            data.userInfo = recv[0]
            data.error = 0
        }
    }
    //console.log(req, res)
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    //let tpl = render.viewEngine('index.html', {})
    res.end(JSON.stringify(data));
};
//
exports.getUuid = async () => {
    let getUuid = Math.floor(Math.random()*90000)+10000;
    let id = await User.findId(getUuid);
    if (id.length) {
        this.getUuid()
    } else {
        return getUuid
    }
},
exports.registerUser = async function(req, res) {
    req.body.uuid = await this.getUuid();
    let login_time = Utils.Dates.Format("yyyy-MM-dd hh:mm:ss");
    req.body.login_time = login_time
    let data = await User.addUser(req.body);
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    //let tpl = render.viewEngine('index.html', {})
    res.end(JSON.stringify({userInfo:req.body}));
};
exports.getActorsByYearAndCountry = (req, res) => {
    const data = actorsModel.getActorsByYearAndCountry(req.params.year, req.params.country);
    const htmlStr = actorsTemplate.build(data);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(htmlStr);
};