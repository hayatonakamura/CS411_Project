// Imports the Google Cloud client library
const express = require('express');
var bodyParser = require('body-parser');
//var router = express.Router();
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');
const vision = require('@google-cloud/vision');
const app = express();
// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: 'secret'
});


app.use(express.static(__dirname + '/resources'));
app.set('view engine', 'pug');

app.get('/',(req,res)=>{
   
    res.render(__dirname + '/view/index.pug');

});

app.listen(3000,() => {
console.log('Starting on port 3000');
});

app.post('/parsed',(req,res)=>{
    var filename;
    console.log('start')
    var form = new formidable.IncomingForm();
        form.parse(req);
        form.on('fileBegin',function(name,file){
            file.path = __dirname + '/uploaded/' + file.name;
            filename = file.name;
            console.log(file.path); 

        })  
        console.log('file uploaded');    
    form.on('file',function(name,file){
        console.log('Uploaded' + file.name);
            client
            .labelDetection('./uploaded/'+file.name)
            //.faceDetection('./uploaded/'+file.name)
            .then(results => {
                const labels = results[0].labelAnnotations;
                //const faces = results[0].faceAnnotations;
                 var labelobj = " " ;
                console.log('Faces:');
                labels.forEach(labels=>{
                    console.log(labels.description);
                    labelobj = labelobj + " , " + labels.description;
                })
    
                let imgfile = file.name;
                console.log('before render',labelobj);
                res.render(__dirname + '/view/parsed.pug',{labelobj,imgfile});
                console.log('after render',labelobj);
            })
            .catch(err => {
                res.render(__dirname + '/view/parsed.pug',{title: 'Invalid', message: 'Invalid', errors: 'Invalid File format'})
                console.error('ERROR:', err);
            })
    });
    
});
