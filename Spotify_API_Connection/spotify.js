var request = require("request");
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();

var clientID = '';
var clientSecret = '';
var callbackURL = 'http://localhost:3000/logindone';


module.exports = function(S){
    // resp.header('Access-Control-Allow-Origin', '*');
    // resp.header('Access-Control-Allow-Headers', 'X-Requested-With');
    
    // client credential

    var authOptions = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: 
        { 
            // 'Postman-Token': '',
            // 'Cache-Control': 'no-cache',
            'Authorization': 'Basic ' + (new Buffer(clientID + ':' + clientSecret).toString('base64'))
            // 'Content-Type': 'application/x-www-form-urlencoded' 
        },
        form: { grant_type: 'client_credentials' },
        json: true
    }

    return new Promise(function(resolve, reject) {
        // Do async job

        request(authOptions, function (error, response, body) {
            var token = body.access_token;

            var options = {
                url: 'https://api.spotify.com/v1/recommendations',
                qs: { seed_genres: S},
                headers: {
                  'Authorization': 'Bearer '+ token
                },
                json: true
            };

            
            request.get(options, function(error, response, body) {
                // console.log(body);
                var arrayofobject = body.tracks;
                arrayofobject.map(function(item) {
                    console.log(item.external_urls.spotify);                           
                })
            });

        });
    })



    // authorization code

    // var authOptions = {
    //     url: 'https://accounts.spotify.com/api/token',
    //     form: {
    //       code: c,
    //       redirect_uri: callbackURL,
    //       grant_type: 'authorization_code'
    //     },
    //     headers: {
    //       'Authorization': 'Basic ' + (new Buffer(clientID + ':' + clientSecret).toString('base64'))
    //     },
    //     json: true
    // };

    // return new Promise(function(resolve, reject) {
    //     // Do async job

    //     request.post(authOptions, function(error, response, body) {
    //         console.log('body is',body);
    //         var token = body.access_token;
    //         spotifyApi.setAccessToken(token);

    //         var options = {
    //             url: 'https://api.spotify.com/v1/recommendations',
    //             qs: { seed_genres: S},
    //             headers: {
    //               'Authorization': 'Bearer '+ token
    //             },
    //             json: true
    //         };

    //         request.get(options, function(error, response, body) {
    //             console.log(body);
    //             // var arrayofobject = body.tracks;
    //             // arrayofobject.map(function(item) {
    //             // console.log(item.external_urls.spotify);                           
    //             // })
    //         });
    //     });
            
    // });

}

