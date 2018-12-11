const vision = require('@google-cloud/vision');
const express = require('express');
var save_tool=  require('../models/product.model'); //Imports schema
var save_local = require('../models/localdb.js');
var save_mood_tool = require('../models/product.model.mood');
var save_mood_local = require('../models/local_mood');
var formidable = require('formidable');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var scale_calc = require('../routes/scale_calc.js');
var spotify = require('../routes/spotify.js');
var camera = require('../routes/camera.js');
//var faceobj = require('./models/faceobj.js');

let username = 'cassie';
let password = 'cassie1004';
let dev_db_url = 'mongodb://' + username + ':' + password + '@ds155313.mlab.com:55313/mood_fixer';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Creates a client
const client = new vision.ImageAnnotatorClient({
    keyFilename: '/Users/leeseunghee/Documents/CS411/mood_fixer_final/moodfixer-0022bbf78ad5 10-04-24-398 10-59-26-743.json'
  })



module.exports = function(req,res,access_token,userid){
    
    var filename;
    console.log('start')
    var form = new formidable.IncomingForm();
        form.parse(req);
        form.on('fileBegin',function(name,file){
            file.path = './uploaded/' + 'test_picture.jpg';
            filename = 'test_picture.jpg';
            console.log(file.path); 
        })  
        console.log('file uploaded');    
        form.on('file',function(name,file){
            client
            .faceDetection('./uploaded/'+ 'test_picture.jpg')     
            .then(results => {
                const faces = results[0].faceAnnotations;
                var tempobj = {
                    user:"",
                    Joy:"",
                    Sorrow:"",
                    Score: "",
                    Genre:[],
                };
                faces.forEach((face, i) => {
                    tempobj['Joy'] = `${face.joyLikelihood}`;
                    tempobj['Sorrow'] = `${face.sorrowLikelihood}`;
                });
                
                tempobj.Genre = scale_calc(tempobj);  
                console.log("return score is ",tempobj.Genre[1]);              
                save_mood_tool(userid,tempobj.Genre[1]);
                
                save_mood_local(userid,tempobj.Genre[1]).then((avg_scores)=>{
                    
                    var music = spotify(tempobj.Genre[0],access_token);
            
                    //pass recent score to avg_scores
                    avg_scores.recent =tempobj.Genre[1]
                    res.render( '../view/parsed.pug',avg_scores);
                    music.then((data)=>{
        
                        //console.log(data);
                        let imgfile = 'test_picture.jpg';
                        //console.log('before render',tempobj);
                        //res.render('../view/parsed.pug',{tempobj,imgfile,data});
                        //console.log('after render',tempobj);
                        
                    })

                });
                
         
               
            })
            .catch(err => {
                res.render('../view/parsed.pug',{title: 'Invalid', message: 'Invalid', errors: 'Invalid File format'})
                console.error('ERROR:', err);
            })
        })
    }
