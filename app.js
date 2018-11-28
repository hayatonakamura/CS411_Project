
// Imports the Google Cloud client library
const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var fs = require('fs'); 
const app = express();
var MongoClient = require('mongodb').MongoClient;
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

// Additional Dependables:
var cloudvision = require('./routes/cloudvision.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/resources'));
app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/routes'));
app.set('view engine', 'pug');

passport.use(new GoogleStrategy({
    clientID:'',
    ClientSecret: '',
    callbackURL:""
},
function(accessToken, refreshToken, profile, cb){
    User.findOrCreate({
        googleId: profile.id}, function(err,user){
                console.log(profile.id)
                return cb(err,user);
        });
    }

));

app.get('/',(req,res)=>{  
    res.render(__dirname + '/view/index.pug');

});

app.get('/login', (req,res)=>{
    res.render(__dirname + '/view/login.pug');
})

app.get('/googleauth',
    passport.authenticate('google',{scope: ['profile']},{failureRedirect:'/login'}),
    function(req,res){
        res.redirect('/logindone');
    });



app.get('/logindone',(req,res)=>{
    res.send('done');
});


let port = 3000;
app.listen( port,() => {
console.log('Server is up and running on port numner ' + port);
});

app.post('/parsed',(req,res)=>{
    cloudvision(req,res);
    
});
