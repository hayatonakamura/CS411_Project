
// Imports the Google Cloud client library
const express = require('express');
var querystring = require('querystring');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var router = express.Router();
var path = require('path');
var fs = require('fs'); 
const jwt = require('jsonwebtoken');
const secret = 'secret';
const app = express();
var MongoClient = require('mongodb').MongoClient;
var camera = require('./routes/camera.js');
const request = require('request')
var passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
var faceobj = require('./models/faceobj.js');
var save_tool= require('./models/product.model'); //Imports schema
var save_user_local = require('./models/localdb.js');

// Additional Dependables:
var cloudvision = require('./routes/cloudvision.js');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/resources'));
app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/routes'));
app.use(express.static(__dirname + '/login', { redirect : false }));
app.set('view engine', 'pug');

var clientID = '21e29a555e914a53a9752ff98e2d7708'
var clientSecret = 'b5614bff2a234b029d5577c9f2770ca5'
var callbackURL = 'http://localhost:3000/logindone'
var userid ;


app.get('/',(req,res)=>{  
    req.cookies.spotify_auth_state = "";
    console.log("at home the cookie is ",req.cookies)
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

        console.log("in login")
        var state = generateRandomString(16);
        res.cookie(stateKey, state);
        var scope = 'user-read-private user-read-email user-library-modify playlist-read-private playlist-modify-private playlist-modify-public';
        res.cookie('fromlogin',true)
        res.redirect('https://accounts.spotify.com/authorize?' +
          querystring.stringify({
            response_type: 'code',
            client_id: clientID,
            scope: scope,
            redirect_uri: callbackURL,
            state: state,
            show_dialog:true
          }));
  
     
  });
    



app.post('/camera',(req,res)=>{
    console.log('hi cassie')
    camera();
});

var access_token;
app.get('/logindone',(req,res)=>{

  jwt.verify(req.cookies.token,'secret',function(err,decoded){
    if(err && !req.cookies.fromlogin){
      console.log("you need to log in!");
      res.redirect('/');
    }else if(req.cookies.fromlogin && !decoded){
        
      req.cookies.fromlogin =false
  
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
          user:body.id,
          name:body.display_name
        }
        name = body.display_name;
        usertoken = userobj.access_token;
        //console.log(body.display_name);
        userid =body.id
        //console.log(body.id)
        save_tool(faceobj);
        save_user_local(faceobj);  
        //res.cookie('userinfo',userobj,{maxAge:3600 , httpOnly: true}).render(__dirname + '/view/loggedin.pug',{title:'user_id', message:name});
         var signedToken = jwt.sign(userobj,secret,{ expiresIn: '1h' });

         res.cookie('token',signedToken,{maxAge:3600}).redirect('/test');
      });
      
    });

    }
    else if(req.cookies.fromlogin && decoded){
      res.redirect('/');
    }
  })

});

app.get('/test',(req,res)=>{
  
  jwt.verify(req.cookies.token,'secret',function(err,decoded){
    if(err){
      console.log("you need to log in!");
      res.redirect('/login');
    }else{
      console.log("user confirmed");
      console.log('decoded: ',decoded);
      res.render(__dirname + '/view/loggedin.pug',{title:'user_id',message: decoded.name});    
  
    }
  })
  
})



let port = 3000;
app.listen( port,() => {
console.log('Server is up and running on port numner ' + port);
});

app.post('/parsed',(req,res)=>{
    console.log('userinfo is : ',userid)
    console.log('cookie check',req.cookies);
    var output = cloudvision(req,res,access_token,userid);
    console.log('outputis: ',output)
    //res.render(__dirname + '/view/parsed.pug');
});

app.get('/spotify',(req,res) =>{
  res.redirect("https://open.spotify.com/collection/tracks")
});

app.get('/logout',(req,res)=>{
  /*var options = {
    method:'GET',
    url:""
  }
  request.get(options, function(error, response, body) {
    
  });*/

  res.clearCookie('token');
  res.clearCookie('spotify_auth_state');
  res.redirect('/');
})




