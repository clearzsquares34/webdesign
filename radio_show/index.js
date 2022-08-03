var express = require("express");
var app = express();
var path = require("path");

app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));

var number_of_users_visiting = 0;
var magic_number = Math.floor(Math.random() * 10000) + 1;
console.log(magic_number);

app.get("/", function(req, res){
    console.log("A new visitor arrived!");
    res.sendFile(__dirname + "\\home.html");
});

app.get("/call", function(req, res){
    number_of_users_visiting = number_of_users_visiting + 1;
    if (number_of_users_visiting == magic_number) {
        res.send("yes");
    } else {
        res.send("no");
    }
});

var listener = app.listen(process.env.PORT || 8080, process.eventNames.HOST || "0.0.0.0", function() {
    console.log("listening on port 8080")
});
   