const vision = require('@google-cloud/vision');
const express = require('express');
var save_tool=  require('../models/product.model'); //Imports schema
var save_local = require('../models/localdb.js');
var formidable = require('formidable');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var scale_calc = require('../routes/scale_calc.js');
var spotify = require('../routes/spotify.js');
var camera = require('../routes/camera.js');
//test
let username = '';
let password = '';
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



module.exports = function(req,res){
    
    var filename;
    console.log('start')
    //camera();
    var form = new formidable.IncomingForm();
        form.parse(req);
        form.on('fileBegin',function(name,file){
            file.path = './uploaded/' + file.name;
            filename = file.name;
            console.log(file.path); 

        })  
        console.log('file uploaded');    
        form.on('file',function(name,file){
        console.log('Uploaded' + file.name);
            client
            .faceDetection('./uploaded/'+ file.name)     
            .then(results => {
                const faces = results[0].faceAnnotations;
                var faceobj = {
                    Joy:"",
                    Sorrow:"",
                    Genre: ""
                };
                console.log('Faces:');
                faces.forEach((face, i) => {
                    console.log(`  Face #${i + 1}:`);
                    console.log(`    Joy: ${face.joyLikelihood}`);
                    console.log(`    Sorrow: ${face.sorrowLikelihood}`);
                    faceobj['Joy'] = `${face.joyLikelihood}`;
                    faceobj['Sorrow'] = `${face.sorrowLikelihood}`;
                    
                    
                });
                
                faceobj.Genre = scale_calc(faceobj);
                console.log("Genre is: ",faceobj.Genre);


                save_tool(faceobj);
                save_local(faceobj);

            var music = spotify(faceobj.Genre);
            
            music.then((data)=>{

                console.log(data);
                let imgfile = file.name;
                console.log('before render',faceobj);
                res.render('../view/parsed.pug',{faceobj,imgfile,data});
                console.log('after render',faceobj);
                
            })
            
            
                
            })
            .catch(err => {
                res.render('../view/parsed.pug',{title: 'Invalid', message: 'Invalid', errors: 'Invalid File format'})
                console.error('ERROR:', err);
            })
        })
    }
