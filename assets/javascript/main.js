$(function () {
    createButtons(kPop, "searchButton", "#buttons-view");
    console.log("KPOP ROCKS!");
});

var kPop = ["2NE1", "BTS", "Girls' Generation", "Psy", "Hello Bitches", "Mr. Simple", "SHINee", "Super Junior"];

//adds buttons based on user-input
function createButtons(kPop, artistOrSong, addToArea) {
    // deletes added content to prevent repeat buttons
    $(addToArea).empty();
    for (var i = 0; i < kPop.length; i++) {
        var a = $("<button>");
        a.addClass(artistOrSong);
        a.attr("data-type", kPop[i]);
        a.text(kPop[i]);
        $(addToArea).append(a);

    }
};

$(document).on("click", ".searchButton", function() {
    var term = $(this).data("type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=8uW2w5RcnSMn8ltX5jYkG3Rr2i5I50Qw&limit=5";
    $.ajax({
        url: queryURL,
        method: "GET"
        }).done(function(response) {
            for (var i = 0; i < response.data.length;i++) {
                var gifDiv = $("<div class='gif-div'>");
                //keep it clean
                var rating = response.data[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                //animated GIF
                var animated = response.data[i].images.fixed_height.url;
                //still image of GIF
                var still = response.data[i].images.fixed_height_still.url;
                let gifImg = $("<img>");
                gifImg.attr("src", still);
                gifImg.attr("data-still", still);
                gifImg.attr("data-animated", animated);
                gifImg.attr("data-state", "still");
                gifImg.addClass("searchImage");
                gifDiv.append(p);
                gifDiv.append(gifImg);
                $("#gifs-view").prepend(gifDiv);
            }
        })
});

//animate or still gif
$(document).on("click", ".searchImage", function() {
    var state = $(this).attr("data-state");
    if(state == "still") {
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});

//user-added new buttons
$("#newButton").on("click", function() {
    var newTerm = $("input").eq(0).val();
    kPop.push(newTerm);
    createButtons(kPop, "searchButton", "#buttons-view");
    return false;
});
