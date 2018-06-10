require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2];
var input = process.argv[3];
if(input === undefined){
    var input = "The Sign";
 }
var movieUrl = "http:/www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

if (command === "my-tweets"){
    var param = {screen_name: "BBNG_", 
                 count:20,
                 trim_user:true,
                 include_entities:false,
                 }
    client.get("statuses/user_timeline", param, function(error, tweets) {
        console.log(param.screen_name + "'s tweets:");
      if (!error) {
        for(var i = 0; i<tweets.length; i++){
            var tweetText = tweets[i].text;
            var tweetCreated = tweets[i].created_at;
            console.log("----------------------------------");
            console.log("Tweet: "+ tweetText);
            console.log("Date: "+ tweetCreated);
            console.log("----------------------------------");
        }
      }
    });
}

if (command === "spotify-this-song"){
    spotify.search({type:"track",query: input, limit:1},function(err,data){
        var searchInfo = data.tracks.items[0];
        var searchArtists = searchInfo.artists[0];
        var searchAlbum = searchInfo.album;
        var searchUrl = searchInfo.external_urls.spotify;
     
        if(!err){
            console.log("Artist: "+searchArtists.name);
            console.log("Song: "+searchInfo.name);
            console.log("Album: "+searchAlbum.name);
            console.log("Preview here: "+searchUrl);
        }
    });
}

if (command === "movie-this"){

}

if (command === "do-what-it-says"){

}



