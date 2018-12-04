
// Imports the Google Cloud client library
const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var fs = require('fs'); 
const app = express();
var MongoClient = require('mongodb').MongoClient;

var passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
//var GoogleStrategy = require('passport-google-oauth20').Strategy;

// Additional Dependables:
var cloudvision = require('./routes/cloudvision.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/resources'));
app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/routes'));
app.set('view engine', 'pug');




passport.use(
    new SpotifyStrategy(
      {
        clientID: '',
        clientSecret: '',
        callbackURL: 'http://localhost:3000/logindone'
      },
      function(accessToken, refreshToken, expires_in, profile, done) {
        User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
          return done(err, user);
        });
      }
    )
  );


app.get('/',(req,res)=>{  
    res.render(__dirname + '/view/index.pug');

});

app.get('/login', (req,res)=>{
    res.render(__dirname + '/view/login.pug');
})

app.get(
    '/spotifyauth',
    passport.authenticate('spotify', { failureRedirect: '/login' }, {scope: ['user-read-email', 'user-read-private'],showDialog: true}),
    function(req, res) {
    console.log(req.body)
      // Successful authentication, redirect home.
      res.redirect('/logindone');
    }
  );

app.get('/logindone',(req,res)=>{
    res.render(__dirname + '/view/loggedin.pug');
});


let port = 3000;
app.listen( port,() => {
console.log('Server is up and running on port numner ' + port);
});

app.post('/parsed',(req,res)=>{
    cloudvision(req,res);
});




