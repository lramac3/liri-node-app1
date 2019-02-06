

require("dotenv").config();
const axios = require('axios');
const command = process.argv[2];
const value = process.argv[3];

//node liri.js spotify-this-song '<song name here>'
const Spotify = require('node-spotify-api');
 
const spotify = new Spotify({
  id: process.env.SPOTIFY_ID || 'tets',
  secret: process.env.SPOTIFY_SECRET || 'tejlfa'
});//create an instance
 
function getMeSpotify(item){
    spotify.search({ type: 'track', query: item,  limit:5}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}

// node liri.js concert-this <artist/band name here>

//https://rest.bandsintown.com/artists/   /events?app_id=codingbootcamp
function getMyBands(artist){


// const url = 'https://rest.bandsintown.com/artists/'+artist+'/events?';
    const url = `https://rest.bandsintown.com/artists/${artist}/events?`;
    axios.get(url, {
        params: {
            app_id: 'codingbootcamp'
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

switch (command){
    case 'concert-this': 
    getMyBands(value);
    break;
    case 'spotify-this-song':
    getMeSpotify(value);
    break;
   default:
   console.log("Please enter one of the commands\n node liri.js concert-this song_value \n node liri.js spotify-this-song song_value")
  }


