const actorsTemplate = require('../views/actors-list');
const actorsModel = require('../models/actors');
const render = require('../lib/readFile')
exports.getList = (req, res) => {
    const data = actorsModel.getList();
    let datas = {
        title: '标签',
        list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
    };
    const hyml=render.viewEngine('index.html', datas)
    const htmlStr = actorsTemplate.build(data);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(hyml);
};

exports.getActorByName = (req, res) => {
    const data = actorsModel.getActorByName(req.params.name);
    const htmlStr = actorsTemplate.build(data);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(htmlStr);
};

exports.getActorsByYearAndCountry = (req, res) => {
    const data = actorsModel.getActorsByYearAndCountry(req.params.year, req.params.country);
    const htmlStr = actorsTemplate.build(data);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(htmlStr);
};