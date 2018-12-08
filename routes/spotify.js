var request = require("request");
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();

var clientID = '';
var clientSecret = '';
var callbackURL = '';



module.exports = function(S,access_token){

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
                //console.log(item.external_urls.spotify); 
                var track_id = item.id;
                //console.log(track_id);
                spotifyApi.addToMySavedTracks([track_id]);                          
        })
    });


});

}

