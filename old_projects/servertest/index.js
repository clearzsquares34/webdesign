var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.sendFile(__dirname + "\\home.html");
});

var listener = app.listen(process.env.PORT || 8080, process.eventNames.HOST || "0.0.0.0", function() {
    console.log("listening on port 8080");
});