//const actorsTemplate = require('../views/actors-list');
const actorsModel = require('../models/actors');
const render = require('../lib/readFile')
exports.getActorByName = async function(req, res) {
    let data = await actorsModel.getList();
    console.log(req, res)
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