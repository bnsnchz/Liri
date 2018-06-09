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
    var param = {screen_name: "BBNG_", 
                 count:20,
                 trim_user:true,
                 include_entities:false,
                 }
    client.get("statuses/user_timeline", param, function(error, tweets) {
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


