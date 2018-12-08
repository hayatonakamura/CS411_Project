
// Imports the Google Cloud client library
const express = require('express');
var querystring = require('querystring');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var router = express.Router();
var path = require('path');
var fs = require('fs'); 
const app = express();
var MongoClient = require('mongodb').MongoClient;
var camera = require('./routes/camera.js');
const request = require('request')
var passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
var faceobj = require('./models/faceobj.js');
var save_tool= require('./models/product.model'); //Imports schema
var save_user_local = require('./models/localdb.js');
//var GoogleStrategy = require('passport-google-oauth20').Strategy;

// Additional Dependables:
var cloudvision = require('./routes/cloudvision.js');
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/resources'));
app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/routes'));

app.set('view engine', 'pug');

var clientID = ''
var clientSecret = ''
var callbackURL = ''
var userid ;

// passport.use(
//     new SpotifyStrategy(
//       {
//         clientID: '21e29a555e914a53a9752ff98e2d7708',
//         clientSecret: 'b5614bff2a234b029d5577c9f2770ca5',
//         callbackURL: 'http://localhost:3000/logindone'
//       },
//       function(accessToken, refreshToken, expires_in, profile, done) {
//         User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
//           return done(err, user);
//         });
//       }
//     )
//   );

app.get('/',(req,res)=>{  
    res.render(__dirname + '/view/index.pug');

});

// app.get('/login', (req,res)=>{
//     res.render(__dirname + '/view/login.pug');
// })


var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
    
  var stateKey = 'spotify_auth_state';
    
  app.get('/login', function(req, res) {
    
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    
    // your application requests authorization
    var scope = 'user-read-private user-read-email user-library-modify playlist-read-private playlist-modify-private playlist-modify-public';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: clientID,
        scope: scope,
        redirect_uri: callbackURL,
        state: state
      }));
  });



app.post('/camera',(req,res)=>{
    console.log('hi cassie')
    camera();
});

var access_token;
app.get('/logindone',(req,res)=>{
    var code = req.query.code || null;
    
    console.log('code',code)

    var authOptions = {
        method:'POST',
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
      access_token = body.access_token;
      var options = {
        method:'GET',
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };
      
      request.get(options, function(error, response, body) {
        faceobj.user = body.id;
        var userobj = {
          access_token: access_token,
          user:body.id
        }
        name = body.display_name;
        console.log(body.display_name);
        userid =body.id
        console.log(body.id)
        save_tool(faceobj);
        save_user_local(faceobj);
        //res.render(__dirname + '/view/loggedin.pug');
        res.cookie('userinfo',userobj,{maxAge:3600 , httpOnly: true}).render(__dirname + '/view/loggedin.pug',{title:'user_id', message:name});
      });
      
    });

});



let port = 3000;
app.listen( port,() => {
console.log('Server is up and running on port numner ' + port);
});

app.post('/parsed',(req,res)=>{
    console.log('userinfo is : ',userid)
    var output = cloudvision(req,res,access_token,userid);
    console.log('outputis: ',output)
    //res.render(__dirname + '/view/parsed.pug');
});

app.get('/spotify',(req,res) =>{
  res.redirect("https://open.spotify.com/collection/tracks")
});


