const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
//connect to the db

var url = "mongodb://127.0.0.1:27017/db";

var ProductLabel = mongoose.model('Object',{
    user: String, 
    Score:[]
});

module.exports = function (S){
    var new_product = new ProductLabel;

    new_product.user = S.user
    
    MongoClient.connect(url,{useNewUrlParser: true},function(err,db){
        if(err){
            console.log('connection failed');
        }
        else{
            var dbo = db.db("emotion_db");

            dbo.collection("emotions").findOne({ 'user': S.user }, 'name occupation', function (err, person) {
                if (err) {
                   
                }
                if(person == null){
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
                else if(person != null){}
                    //console.log('person found: ',person)
              });

            
        }
    });


}

