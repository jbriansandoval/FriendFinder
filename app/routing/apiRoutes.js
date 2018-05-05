var path = require("path");
var friends = require("../data/friends");

module.exports = function (app) {

  app.get("/api/friendslist", function(req, res) {
    res.json(friends);
    });

  app.post("/api/friendslist", function(req, res) {
    // store the request data in a variable
    var user = req.body;

    // will eventually store the name and photo of the best match determined below in a variable to be returned in the res.json
    var friendMatch;

    var maxDifference = 44;
    
    // loop through the existing friends array from the friendsData.js file and any new friend pushed into that array
    for (i = 0; i < friends.length; i++) {
        // log name of friends in array for testing
        // console.log(friends[i].name);
        var totalDifference = 0;
        // now loop through the scores of each to find difference
        for (j = 0; j < user.scores.length; j++) {
          // now storing the difference of each score of the new friend to that of each in the friends array
          var difference = Math.abs(parseInt(user.scores[j]) - parseInt(friends[i].scores[j]));
          // adding the difference of each value and creating a sum of total difference
          totalDifference += difference;
          // console log for testing
          // console.log(totalDifference); 
        }
        // if the total difference for each is less than that max difference possible, it becomes new best, as it loops through all friends
        if (totalDifference < maxDifference) {
          maxDifference = totalDifference;
          // the friend match = the data of the best match chosen
          friendMatch = friends[i]; 
        }
    }
    // console log the best match friend for testing
    console.log(friendMatch);

    // makes int a positive number
    // Math.abs();

    friends.push(user);
    // serve up the data of the best friend match
    res.json(friendMatch);
  });

};