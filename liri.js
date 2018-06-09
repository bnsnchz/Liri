require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require("twitter");
// var Spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

// var movieUrl = "http:/www.omdbapi.com/?t=" + moviename + "&y=&plot=short&apikey=trilogy";

if (command==="my-tweets"){
    // client.GET statuses/user_timeline;
    console.log("this is a tweet");
}


