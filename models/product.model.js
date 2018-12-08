const mongoose = require('mongoose');
var PL =require('../models/object2.js')
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise

mongoose.connect('mongodb://cassie:cassie1004@ds155313.mlab.com:55313/mood_fixer');


module.exports = function(S){

    var product1 = new PL;
    product1.user = S.user


    PL.find({user:S.user},function(err, docs) {

       
        if(err){
            console.log(err)
        }
        if(!docs[0]){

            product1.save().then((doc)=>{
                console.log('Saved Product!')
            });

        }
        else {
            //console.log('person found online',docs)
        }


    })
    
   


}


// Export the model
//module.exports = mongoose.model('ProductLabel', ProductLabel);

