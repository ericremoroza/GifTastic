$(document).ready(function () {

    var kPop = [
        "2NE1", "BTS", "Girls' Generation", "Psy", "Hello Bitches", "Mr. Simple", "SHINee", "Super Junior"];

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

    }

    $(document).on("click", ".searchButton", function () {
        $("#gifs-view").empty();
        $(".searchImage").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=8uW2w5RcnSMn8ltX5jYkG3Rr2i5I50Qw&limit=5";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='gif-div'>");
                    //keep it clean
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    //animated GIF
                    var animated = results[i].images.fixed_height.url;
                    //still image of GIF
                    var still = results[i].images.fixed_height_still.url;
                    let gifImg = $("<img>");
                    gifImg.attr("src", still);
                    gifImg.attr("data-still", still);
                    gifImg.attr("data-animate", animated);
                    gifImg.attr("data-state", "still");
                    gifImg.addClass("searchImage");
                    gifDiv.append(p);
                    gifDiv.append(gifImg);
                    $("#gifs-view").append(gifDiv);
                }
            });
    });

    //animate or still gif
    $(document).on("click", ".searchImage", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    //user-added new buttons
    $("#newButton").on("click", function (event) {
        event.preventDefault();
        var newTerm = $("input").eq(0).val();

        if (newTerm.length > 2) {
            kPop.push(newTerm);
        }

        createButtons(kPop, "searchButton", "#buttons-view");

    });

    createButtons(kPop, "searchButton", "#buttons-view");
});
