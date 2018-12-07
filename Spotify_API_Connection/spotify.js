
var request = require("request");
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();

var clientID = '';
var clientSecret = '';
var callbackURL = 'http://localhost:3000/logindone';


module.exports = function(S, access_token){
//     // resp.header('Access-Control-Allow-Origin', '*');
//     // resp.header('Access-Control-Allow-Headers', 'X-Requested-With');
    
//     // client credential

//     var authOptions = {
//         method: 'POST',
//         url: 'https://accounts.spotify.com/api/token',
//         headers: 
//         { 
//             // 'Postman-Token': '',
//             // 'Cache-Control': 'no-cache',
//             'Authorization': 'Basic ' + (new Buffer(clientID + ':' + clientSecret).toString('base64'))
//             // 'Content-Type': 'application/x-www-form-urlencoded' 
//         },
//         form: { grant_type: 'client_credentials' },
//         json: true
//     }

//     return new Promise(function(resolve, reject) {
//         // Do async job

//         request(authOptions, function (error, response, body) {
//             var token = body.access_token;

//             var options = {
//                 url: 'https://api.spotify.com/v1/recommendations',
//                 qs: { seed_genres: S},
//                 headers: {
//                   'Authorization': 'Bearer '+ token
//                 },
//                 json: true
//             };

            
//             request.get(options, function(error, response, body) {
//                 console.log('in spotify',access_token)
//                 // console.log(body);
//                 var arrayofobject = body.tracks;
//                 arrayofobject.map(function(item) {
//                     console.log(item.external_urls.spotify);                           
//                 })
//             });

//         });
//     })

    console.log('access token is', access_token);

    return new Promise(function(resolve, reject) {

        spotifyApi.setAccessToken(access_token);

        var user_id;

        spotifyApi.getMe()
        .then(function(data) {
            user_id = data.body.id
            console.log('Some information about the authenticated user', data.body);
        }, function(err) {
            console.log('Something went wrong!', err);
        });


        // var optionsCreatePlaylist = {
        //     url: 'https://api.spotify.com/v1/users/'+user_id+'/playlists',
        //     headers: {
        //         'Authorization': 'Bearer '+ access_token,
        //         'Content-Type': 'application/json'
        //     },
        //     json: true,
        //     body: JSON.stringify({
        //         'name': 'cool playlist',
        //         'public':false
        //     })
        // };

        // request.post(optionsCreatePlaylist, function(error, response, body){
        //     console.log(body);
        // });


        // get recommendation
        var optionsRecommendation = {
            url: 'https://api.spotify.com/v1/recommendations',
            qs: { seed_genres: S},
            headers: {
                'Authorization': 'Bearer '+ access_token
            },
            json: true
        };
            
        request.get(optionsRecommendation, function(error, response, body) {
            var arrayofobject = body.tracks;
                arrayofobject.map(function(item) {
                    console.log(item.external_urls.spotify); 
                    var track_id = item.id;
                    console.log(track_id);
                    spotifyApi.addToMySavedTracks([track_id]);                          
            })
        });


    });

}

