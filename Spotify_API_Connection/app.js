
// Imports the Google Cloud client library
var request = require('request'); 
var querystring = require('querystring');
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

var clientID = '168bf21f216b4bd1af6d571c272ee031';
var clientSecret = '2e00b9b143ec47e3bf737ba7492127d0';
var callbackURL = 'http://localhost:3000/logindone';
// passport.use(new GoogleStrategy({
//     clientID:'7083216799-e7v5oqfmrrq1uhmblnknprcvulvrtku8.apps.googleusercontent.com',
//     ClientSecret: '6_vUFQS2p_d1k_TCpgUVxGq2',
//     callbackURL:"http://localhost:3000/logindone"
// },
// function(accessToken, refreshToken, profile, cb){
//     User.findOrCreate({
//         googleId: profile.id}, function(err,user){
//                 console.log(profile.id)
//                 return cb(err,user);
//         });
//     }

// ));

passport.use(
    new SpotifyStrategy(
      {
        clientID: '168bf21f216b4bd1af6d571c272ee031',
        clientSecret: '2e00b9b143ec47e3bf737ba7492127d0',
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
    passport.authenticate('spotify', { failureRedirect: '/login' }, {scope: ['user-read-email', 'user-read-private', 'user-library-modify'],showDialog: true}),
    function(req, res) {
    console.log(req.body)
      // Successful authentication, redirect home.
      res.redirect('/logindone');
    }
);


app.get('/logindone',(req,res)=>{
    var code = req.query.code || null;

    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: callbackURL,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(clientID + ':' + clientSecret).toString('base64'))
      },
      json: true
    };


    request.post(authOptions, function(error, response, body) {
      var access_token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log(body.id);
      });

      // res.redirect('/#' +
      // querystring.stringify({
      //   access_token: access_token,
      // }));

    });
  
    res.render(__dirname + '/view/loggedin.pug');
});


let port = 3000;
app.listen( port,() => {
console.log('Server is up and running on port numner ' + port);
});

app.post('/parsed',(req,res)=>{
    cloudvision(req,res);
});




