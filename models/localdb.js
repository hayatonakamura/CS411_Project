const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
//connect to the db

var url = "mongodb://127.0.0.1:27017/db";

var ProductLabel = mongoose.model('Object',{
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

module.exports = function (S){
    var new_product = new ProductLabel;

    new_product.mood = S;

    MongoClient.connect(url,{useNewUrlParser: true},function(err,db){
        if(err){
            console.log('connection failed');
        }
        else{
            var dbo = db.db("emotion_db");
            dbo.collection("emotions").insertOne(new_product,function(err,result){
                if(err)
                {
                    console.log(err);
                    return;
                }
                console.log('item inserted');
                db.close();
            });
        }
    });


}

