var request = require("request");
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();

var clientID = '';
var clientSecret = '';
var callbackURL = 'http://localhost:3000/logindone';



module.exports = function(S){
    // resp.header('Access-Control-Allow-Origin', '*');
    // resp.header('Access-Control-Allow-Headers', 'X-Requested-With');

    var authOptions = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: 
        { 'Postman-Token': '',
            'Cache-Control': 'no-cache',
            Authorization: 'Basic',
            'Content-Type': 'application/x-www-form-urlencoded' },
        form: { grant_type: 'client_credentials' }
    }

    return new Promise(function(resolve, reject) {
                    // Do async job
        request(authOptions, function (error, response, body) {
            if (error) reject(error);
                console.log(body)
                resolve(body);
            });
    })

}

// module.exports = function(S){

//     var options = { 
//         method: 'GET',
//         url: 'https://api.spotify.com/v1/search',
//         qs: { q: S, type: 'playlist' ,limit:1},
//         headers: 
//             { 'Postman-Token': 'a587c239-42a2-4146-86f4-dffb6e2eef37',
//             'Cache-Control': 'no-cache',
//             Authorization: 'Bearer BQAmozwT5lTjex4vEq4mWKmc3PeP4lrwfyPuPlHLPAI7io2y1m0InF-TT7O0r_B0r2vzb0IY6GFtvsGE3Q0'} 
//             };
        
//         return new Promise(function(resolve, reject) {
//             // Do async job
//                 request.get(options, function(err, resp, body) {
//                     if (err) {
//                         console.log(err)
//                         reject(err);
//                     } else {
//                         var res = JSON.parse(body)
//                         resolve(res.playlists.items[0].external_urls.spotify);
//                     }
//                 })
//             })

// }