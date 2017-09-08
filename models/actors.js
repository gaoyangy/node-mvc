const actors = require('./test-data');

exports.getList = () => {
    setTimeout(() => {
       return actors
    },1500)
};

exports.getActorByName = (name) => actors.filter(actor => {
    return actor.name == name;
});

exports.getActorsByYearAndCountry = (year, country) => actors.filter(actor => {
    return actor["birth year"] == year && actor.country == country;
});