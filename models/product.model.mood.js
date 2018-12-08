//save the user feeling and scores.

const mongoose = require('mongoose');
var PL =require('../models/object2.js')
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise

mongoose.connect('mongodb://cassie:cassie1004@ds155313.mlab.com:55313/mood_fixer');


module.exports = function(userid,S){

    
    PL.findOneAndUpdate({'user': userid}, {$push:{Score:S}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        
    });



}


// Export the model
//module.exports = mongoose.model('ProductLabel', ProductLabel);

