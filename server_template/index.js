var express = require("express");
var app = express();
var path = require("path");

app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));

app.get("/", function(req, res){
    res.sendFile(__dirname + "\\home.html");
});

var listener = app.listen(process.env.PORT || 8080, process.eventNames.HOST || "0.0.0.0", function() {
    console.log("listening on port 8080");
});