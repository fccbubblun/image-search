require('dotenv').config();
var express = require('express');
var google = require('googleapis');
var customsearch = google.customsearch('v1');
var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  customsearch.cse.list(
    {cx: process.env.CX, q: "hello world", auth: process.env.GAUTH, searchType: "image"},
    function(err, resp){
      if(err){
        return console.log("Error:", err);
      }
      console.log("Response:" + resp.searchInformation.formattedTotalResults);
      if (resp.items && resp.items.length > 0) {
        console.log('First result is ' + JSON.stringify(resp.items[0]));
      }
    });
    response.sendFile(__dirname + '/views/description.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
