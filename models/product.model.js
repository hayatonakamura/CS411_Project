const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise

mongoose.connect('');

module.exports = function(S){

    var ProductLabel = mongoose.model('LabelObject',{
        name: String, 
        mood: {
            Joy:"",
            Sorrow:"",
            Scale:0,
            Genre: ""
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

