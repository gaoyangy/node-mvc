const actorsTemplate = require('../views/actors-list');
const actorsModel = require('../models/actors');
const render = require('../lib/readFile')
exports.getList =async function(req, res){
    let  data = await actorsModel.getList();
    res.end(JSON.stringify(data));
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