// Imports the Google Cloud client library
const express = require('express');
const bodyParser = require('body-parser');
//var router = express.Router();
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');
const vision = require('@google-cloud/vision');
const app = express();

// Additional Dependables:
var mongo = require('mongodb');
var mongoose = require('mongoose');
const product = require('./routes/product.route'); // Imports routes for the products
var save_tool=  require('./models/product.model'); //Imports schema


// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: '/Users/Hayato/Documents/GitHub/CS411_Project/CS411 Mood Fixer-dd42d32fc6af.json'
});

// Database
//const mongoose = require('mongoose');
let username = 'hayaton';
let password = 'cs411password';
let dev_db_url = 'mongodb://' + username + ':' + password + '@ds153093.mlab.com:53093/moodfixer';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/products', product);


// end addition


app.use(express.static(__dirname + '/resources'));
app.set('view engine', 'pug');

app.get('/',(req,res)=>{
   
    res.render(__dirname + '/view/index.pug');

});

let port = 3000;
app.listen(port,() => {
console.log('Server is up and running on port numner ' + port);
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

                save_tool(labelobj);
    
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
