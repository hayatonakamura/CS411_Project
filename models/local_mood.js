const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
//connect to the db

var url = "mongodb://127.0.0.1:27017/db";

var ProductLabel = mongoose.model('Object3',{
    user: String, 
    Score:[]
});

module.exports = function (userid,S){
    var new_product = new ProductLabel;
    var avg_scores = [];

    new_product.user = S.user;
    return new Promise(function(resolve,reject){

    MongoClient.connect(url,{useNewUrlParser: true},function(err,db){
        if(err){
            console.log('connection failed');
        }
        else{
 
                console.log("Promise started")
                var dbo = db.db("emotion_db");
                dbo.collection("emotions").findOneAndUpdate({user: userid}, {$push:{Score:S}}, {new: true}, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                    reject(err);
                }
                else
                {   
                    var resolveobj ={
                        avg:0,
                        score:[],
                        recent:0
                    }
                    var total = 0;
                    for(var i =0;i <doc.value.Score.length;i++){
                        if(isNaN(doc.value.Score[i])){
                            continue;
                        }
                        total += doc.value.Score[i];
            
                    }
                   
                    console.log('total is',total);
                    
                    avg_scores = total/doc.value.Score.length;
                    resolveobj.avg = avg_scores
                    resolveobj.score = doc.value.Score
                    resolveobj.recent = doc.value.Score[doc.value.Score.length-1];
                    resolve(resolveobj);

                }
    
            });
                
     
        }

    });

  })

}

