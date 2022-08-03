var numberoftimesclicked = 0;

function wasclicked() {
    numberoftimesclicked = numberoftimesclicked + 1;
    var text = document.getElementById("clicked_text");
    text.innerHTML = "Times you've clicked the button: " + numberoftimesclicked;
}