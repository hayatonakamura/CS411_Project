const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise

mongoose.connect('mongodb://cassie:cassie1004@ds155313.mlab.com:55313/mood_fixer');

module.exports = function(S){

    var ProductLabel = mongoose.model('LabelObject',{
        name: String, 
        mood: {
            Joy:"",
            Anger:"",
            Sorrow:"",
            Surprise:"",
            underExposedLikelihood:"",
            blurredLikelihood:"",
            headwearLikelihood:""
        } 
    });
    
    var product1 = new ProductLabel;

    product1.mood = S;

    product1.save().then((doc)=>{
        console.log('Saved Product!')
        console.log(doc);
    });


}


// Export the model
//module.exports = mongoose.model('ProductLabel', ProductLabel);

