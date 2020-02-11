const mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    name: String,
    pic: String,
});

const movieModel = mongoose.model('movies', movieSchema);

module.exports = movieModel;

console.log('====== "movieModel" export done')