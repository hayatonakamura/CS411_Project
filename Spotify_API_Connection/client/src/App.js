import React, { Component } from 'react';
import './App.css';

// import Spotify from 'spotify-web-api-js';
const Spotify = require('spotify-web-api-js');

const spotifyWebApi = new Spotify();

class App extends Component {

  constructor(){
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      SearchPlaylists: {
          name: 'Not yet got it',
          url: 'Not yet got it'
      }
    }
    if(params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }

  getHashParams() {  // this function is copied from server side app.js
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  // Searching() {
  //   spotifyWebApi.getRecommendations({ seed_genres: 'sad' })
  //   .then((response) => {
  //           console.log(response);
  //           var arrayofObjects = response.tracks;
  //           console.log(arrayofObjects);
  //           if(response != null){
  //             var ret = arrayofObjects.map(item => {
  //               console.log(item.external_urls.spotify);
  //               this.setState({
  //                   SearchPlaylists:{
  //                       name: item.name,
  //                       url: item.external_urls.spotify
  //                       // image: item.album.images[0].url
  //                   }
  //               })
  //             }
  //             )
  //           }
  //   }
  //   )
  // }


  Searching() {

    spotifyWebApi.getRecommendations({ seed_genres: 'sad,sleep' })
    .then((response) => {
            console.log(response);
            var arrayofObjects = response.tracks;
            console.log(arrayofObjects);
            if(response != null){
              var ret = arrayofObjects.map(item => {
                console.log(item.external_urls.spotify);
                var track_id = item.id;
                spotifyWebApi.addToMySavedTracks([track_id]);
              })
            }
            window.open("https://open.spotify.com/collection/tracks")
    })
  }


  render() {
    return (
      <div className="App">
        <a href = 'http://localhost:8888'>
          <button>login with spotify</button>
        </a>
        {/* <div> Search for Playlist: { this.state.SearchPlaylists.name } </div>
        <div>Here is the link: { this.state.SearchPlaylists.url }</div> */}
        <button onClick = {() => this.Searching()}>
          Check out recommended music!
        </button>
      </div>
    );
  }
}

export default App;
