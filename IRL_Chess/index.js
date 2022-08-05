/*
    For this project, we'll make a "choose your own adventure" game.
    The user will start on the home page, and make decisions to progress the story as they like.
    Whenever they make a decision, we will take them to a different "page"
        - These different pages are actually all the same .hbs file, just filled with different content
    
    We will use a query parameter in our url headers to tell the server where the user is in the story
    Unlike in the books, we don't have to use a number (for example, "go to page 53")!
        - Instead, we can have the paramater be some text that describes the action.
        - Example:
            - "to punch the monster, go to ~~~~?id=punch_monster"
            - "to run away, go to ~~~~?id=run_away"
            
        - This helps you as the writer keep better track of your story...
        - ...and also makes it harder for the user to cheat, since they'd have to guess the param correctly.
    We'll also use hyperlinks so that the user doesn't have to type in the id manually.
*/

var express = require("express");
var app = express();
var path = require("path");
var hbs = require("hbs");

/* swap from rendering html pages to using handlebars pages */
app.set("view engine", "hbs");
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/img", express.static(path.join(__dirname, "images")));


/* when the user comes to our home page, send them something */
app.get("/", function(req, res){
    console.log(req.query.decision);  // print out what the user tried to do to the console
    
    /*
        We'll use an object called "data" to store whatever text we'd like to put on screen.
        For now, let's just set some random values, we'll change them below. 
        
                               text_to_show --  this is whatever story related text we want to describe to the user
            option_1_text and option_2_text --  these are the options they're given ("run" or "hide", for example)
        option_1_result and option_2_result --  these are the ids we will send them to when they click an option
    */
    data = {
        text_to_show: "sample sample sample",
        option_1_text: "Option 1",
        option_1_result: "option_1_result",
        option_2_text: "Option 2",
        option_2_result: "option_2_result",
        image_name: "blah.png"
    }
    
    // the id is undefined when they first come to our page. Let's introduce the story to them
    if (req.query.decision == undefined) {
        data.text_to_show = "You wake up in a field in the wide countryside. Behind your back, you see a fomation of warrior of white pawns facing you and the enemy force beyond. In front of you, you see a white pawn being blocked off by multiple pawns, and to the left, a back knight, armed and ready to charge at a moments notice to eliminate the standing pawn in front. You also notice another knight of the opposite color guarding the pawn in front in preperation of an upcoming attack. You must now continue and advance to victory in this game of IRL Chess, and prove to you king that you are worthy of leading his forces into battle. The position you are starting from is the Benoni Defense: Modern Variation: Previous Moves: 1.d4 Nf6 2.c4 c5 3.d5 e6 4.Nc3 exd5 5.cxd5 d6."
        data.option_1_text = "Move Ng1 to position f3."
        data.option_2_text = "Move Ne3 to position e4."

        // for the results, we can choose whatever we want. Let's be descriptive, but brief.
        data.option_1_result = "?decision=Nf3"
        data.option_2_result = "?decision=Ne4"
        data.image_name = "test.png"

        // render the page with this data. Go look at "home.hbs" to see where it all goes!
        res.render("home", data);
    } else if (req.query.decision == "Nf3") {
        data.text_to_show = "Your knight is under threat. What is your move?"
        data.option_1_text = "Move Bc1 to g6."
        data.option_2_text = "Move h2 to h3."
        data.image_name = "test1.png";

        // for the results, we can choose whatever we want. Let's be descriptive, but brief.
        data.option_1_result = "?decision=Bg6"
        data.option_2_result = "?decision=h3"
        res.render("home", data);

    } else if (req.query.decision == "Bg6") {
        data.text_to_show = "Your Knight has fallen. What is your move?"
        data.option_1_text = "Move Bg5 to Bxf6."
        data.option_2_text = "Move to Exf3." // if we dont show any text, there's no second link
        data.image_name = "test3.png";
        

        data.option_1_result = "?decision=Bf6"
        data.option_2_result = "?decision=Exf3"
        res.render("home", data);
    
    } else if (req.query.decision == "Bf6") {
        data.text_to_show = "Move Bishop g5 to Bxf6, Black moves Bf3 to Bxe2."
        data.option_1_text = "Move Nc3 to e4, Black moves Bf3 to Bxe4"
        data.option_2_text = "" // if we dont show any text, there's no second link
        data.image_name = "test5.png";
        res.render("home", data);

    } else if (req.query.decision == "Exf3") {
        data.text_to_show = ""
        data.option_1_text = ""
        data.option_2_text = "" // if we dont show any text, there's no second link
        data.image_name = "test8.png";
        res.render("home", data);

        data.option_1_result = "?decision=Bxf6"
        data.option_2_result = "?decision=Bxe4"
        res.render("home", data);

    } else if (req.query.decision == "Bxe4") {
        data.text_to_show = ""
        data.option_1_text = ""
        data.option_2_text = "" // if we dont show any text, there's no second link
        data.image_name = "test5.png";
        res.render("home", data);

        // then below this, you'd add more 
    } else if (req.query.decision == "h3") {
        data.text_to_show = "You traded a Knight for a Bishop."
        data.option_1_text = "Move Nc3 to a4, Black moves Bc8 to d7, you move Na4 to b6."
        data.option_2_text = "Move Bf1 to a4, Black moves Nb8 to d7, you castle." // if we dont show any text, there's no second link
        data.option_1_result = "" // a blank result will send no "decision" parameter (sending them back to the main page)
        data.image_name = "test6.png";
        res.render("home", data);
    
        data.option_1_result = "?decision=Nb6"
        data.option_2_result = "?decision=h3"
        res.render("home", data);
        
        
    } else if (req.query.decision == "Nb6") {
        data.text_to_show = "You blundered a knight, you have failed your king."
        data.option_1_text = "Restart"
        data.option_2_text = "" // if we dont show any text, there's no second link
        data.option_1_result = "" // a blank result will send no "decision" parameter (sending them back to the main page)
        data.image_name = "test5.png";
        res.render("home", data);

    } else if (req.query.decision == "Ne4") {
        data.text_to_show = "You blundered a knight, you have failed your king."
        data.option_1_text = "Restart"
        data.option_2_text = "" // if we dont show any text, there's no second link
        data.option_1_result = "" // a blank result will send no "decision" parameter (sending them back to the main page)
        data.image_name = "test2.png";
        res.render("home", data);
    }
    else {
        // the user should never really come here. if they did, you probably typoed one of the decisions
        // let's just send them back to the main page, and log a message for ourselves
        console.log("something broke. the user tried to make decision: " + req.query.decision);

        data.text_to_show = "You broke something"
        data.option_1_text = "Restart"
        data.option_2_text = ""
        data.option_1_result = ""
        data.option_2_result = ""
        res.render("home", data);   // <-------------------
    }
});

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("listening on port 8080");
});