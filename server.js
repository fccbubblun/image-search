var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/description.html');
});

app.get("/whoami", function (request, response) {
  var json = {"ip": request.headers["x-forwarded-for"] || request.ip, "language": request.headers["accept-language"], "software": request.headers["user-agent"]};
  response.send(json);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
