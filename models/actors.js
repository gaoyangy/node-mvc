const actors = require('./test-data');
const db = require('../config/database')
exports.getList = () => {

     
    return 
};

exports.getActorByName = (name) => actors.filter(actor => {
    return actor.name == name;
});

exports.getActorsByYearAndCountry = (year, country) => actors.filter(actor => {
    return actor["birth year"] == year && actor.country == country;
});