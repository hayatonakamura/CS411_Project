var mongoose = require('mongoose')
var schema = mongoose.Schema({
    user: String, 
    Score:[]
})

module.exports = mongoose.model('object2',schema)