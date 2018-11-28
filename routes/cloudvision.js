const vision = require('@google-cloud/vision');
const express = require('express');
var save_tool=  require('../models/product.model'); //Imports schema
var save_local = require('../models/localdb.js');
var formidable = require('formidable');
var mongoose = require('mongoose');
var mongo = require('mongodb');

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

module.exports = function(req,res){
    
    var filename;
    console.log('start')
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
                    Anger:"",
                    Sorrow:"",
                    Surprise:"",
                    underExposed:"",
                    blurred:"",
                    headwear:""
                    
                };
                console.log('Faces:');
                faces.forEach((face, i) => {
                    console.log(`  Face #${i + 1}:`);
                    console.log(`    Joy: ${face.joyLikelihood}`);
                    console.log(`    Anger: ${face.angerLikelihood}`);
                    console.log(`    Sorrow: ${face.sorrowLikelihood}`);
                    console.log(`    Surprise: ${face.surpriseLikelihood}`);
                    faceobj['Joy'] = `${face.joyLikelihood}`;
                    faceobj['Anger'] = `${face.angerLikelihood}`;
                    faceobj['Sorrow'] = `${face.sorrowLikelihood}`;
                    faceobj['Surprise'] = `${face.surpriseLikelihood};`;
                    faceobj['underExposed'] = `${face.underExposedLikelihood}`;
                    faceobj['headwear'] =  `${face.headwearLikelihood}`;
                    
                });
                save_tool(faceobj);
                save_local(faceobj);

                let imgfile = file.name;
                console.log('before render',faceobj);
                res.render('../view/parsed.pug',{faceobj,imgfile});
                console.log('after render',faceobj);
            })
            .catch(err => {
                res.render('../view/parsed.pug',{title: 'Invalid', message: 'Invalid', errors: 'Invalid File format'})
                console.error('ERROR:', err);
            })
        })
    }
