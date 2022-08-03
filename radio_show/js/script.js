//calls the radio station
function call() {
    $.get("/call", function(responseText){
        console.log("success");
        if (responseText == "yes") {
            console.log("yeah");
        } else {
            console.log("hmmmmmm");
        }
    });

}
//has the station reset the count
function reset() {

}