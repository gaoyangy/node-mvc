//const actorsTemplate = require('../views/actors-list');
const actorsModel = require('../models/actors');
const User = require('../models/user');
const render = require('../lib/readFile')
exports.getActorByName =  async function(req, res) {
    let data = {}
    let recv = await User.findName(req.body);
    if (!recv.length) {
        data.msg ='没有此用户！'
        data.error= 0
            //console.log(req, res)
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    //let tpl = render.viewEngine('index.html', {})
    return res.end(JSON.stringify(data));
    }
    if (req.body.userName === recv[0].user_name) {
        if(req.body.password !== recv[0].password){
            data.msg ='密码错误！'
            data.error= 1
        }else{
            data.msg ='登陆成功！'
            data.error= 0
        }
    }
    //console.log(req, res)
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    //let tpl = render.viewEngine('index.html', {})
    res.end(JSON.stringify(data));
};
exports.login = async function(req, res) {
    let data = await actorsModel.getList();
    let resBody = {
        msg: '登陆成功',
        error: 0
    }
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    //let tpl = render.viewEngine('index.html', {})
    res.end(JSON.stringify(resBody));
};
exports.getActorsByYearAndCountry = (req, res) => {
    const data = actorsModel.getActorsByYearAndCountry(req.params.year, req.params.country);
    const htmlStr = actorsTemplate.build(data);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(htmlStr);
};