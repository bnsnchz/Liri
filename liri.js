require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var inquirer = require("inquirer");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var choice;
function searchSong(answer){
    choice = answer.songName;
    if(answer.songName === ""){
        choice = "The Sign";
        spotify.search({type:"track",query: "The Sign"},function(err,data){
            var searchInfo = data.tracks.items[7];
            var searchArtists = searchInfo.artists[0];
            var searchAlbum = searchInfo.album;
            var searchUrl = searchInfo.external_urls.spotify;
            if(!err){
                console.log("You didn't pick a song so I picked one for you...")
                console.log("Artist: "+searchArtists.name);
                console.log("Song: "+searchInfo.name);
                console.log("Album: "+searchAlbum.name);
                console.log("Preview here: "+searchUrl);
                liri();
            }
            // console.log(searchArtists);
        })
    }
    else{
    spotify.search({type:"track",query: choice},function(err,data){
    var searchInfo = data.tracks.items[0];
    var searchArtists = searchInfo.artists[0];
    var searchAlbum = searchInfo.album;
    var searchUrl = searchInfo.external_urls.spotify;

    if(!err){
        console.log("Artist: "+searchArtists.name);
        console.log("Song: "+searchInfo.name);
        console.log("Album: "+searchAlbum.name);
        console.log("Preview here: "+searchUrl);
        liri();
    }
});
}

}

function liri(){
inquirer.prompt([
    {
        type:"list",
        name:"menu",
        message:"What can I help you with?",
        choices:["Get my tweets","Look up a song","Look up a movie","Do what it says","Exit"]
    }
]).then(function(answer){

    command = answer.menu;

if (command === "Get my tweets"){
    inquirer.prompt([
        {
            type:"input",
            message:"What is your username?",
            name:"username",
        }
    ]).then(function(answer){
        var param = {screen_name: answer.username,
                    count:20,
                    trim_user:true,
                    include_entities:false,
                    }
        client.get("statuses/user_timeline", param, function(error, tweets) {
        console.log("Your tweets:");
        if (!error) {
            for(var i = 0; i<tweets.length; i++){
                var tweetText = tweets[i].text;
                var tweetCreated = tweets[i].created_at;
                console.log("----------------------------------");
                console.log("Tweet: "+ tweetText);
                console.log("Date: "+ tweetCreated);
                console.log("----------------------------------");
   
            }
            liri();
        }
        });
    });

}


if (command === "Look up a song"){
    inquirer.prompt([
        {
            type:"input",
            message:"What song are you looking for?",
            name:"songName",
        }]).then(function(answer){
            searchSong(answer);
        });

}


if (command === "Look up a movie"){
    inquirer.prompt([
        {
            type:"input",
            message:"What movie are you looking for?",
            name:"movieName",
        }]).then(function(answer){
            movie = answer.movieName
            request("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
                if (!error) {
                    // console.log(JSON.parse(body))
                    console.log("Name: " + JSON.parse(body).Title);
                    console.log("Year: " + JSON.parse(body).Year);
                    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                    console.log("Country: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                    liri();

                }
              });
              
        });

    }


if (command === "Do what it says"){
    fs.readFile("random.txt", "utf-8", function(err, data){
        var output = data.split(",");
        var answer ={}
        answer.songName = output[1];
        
        searchSong(answer);

    });
}
if (command === "Exit"){
    return;
}

})

}

liri();




