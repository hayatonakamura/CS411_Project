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
          name: 'Not yet got it = =',
          image: ''
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


  Searching(){
    spotifyWebApi.searchPlaylists('happy')
      .then((response) => {
        if(response != null){
          const list = response.playlists.items;
          list.map(item => {
            this.setState({
              SearchPlaylists:{
                name: item.name,
                image: item.images[0].url
              }
            })
          }
          )
        }
      })
  }

  render() {
    return (
      <div className="App">
        <a href = 'http://localhost:8888'>
          <button>login with spotify</button>
        </a>
        <div> Search for 'Happy' Playlist: { this.state.SearchPlaylists.name } </div>
        <div><img src = { this.state.SearchPlaylists.image }/></div>
        <button onClick = {() => this.Searching()}>
          Now do the search
        </button>
      </div>
    );
  }
}

export default App;
