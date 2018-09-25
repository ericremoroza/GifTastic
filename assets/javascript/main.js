$(document).ready(function () {
    var kPop = ["2NE1", "BTS", "Girls' Generation", "Psy", "Hello Bitches", "Mr. Simple", "SHINee", "Super Junior"];

    //adds buttons based on user-input
    function createButtons() {
        // deletes added content to prevent repeat buttons
        // $("#buttons-view").empty();
        for (var i = 0; i < kPop.length; i++) {
            var a = $("<button>");
            a.addClass("artistOrSong");
            a.attr("data-name", kPop[i]);
            a.text(kPop[i]);
            $("#gifs-view").append(a);
            console.log(kPop[i]);
        }
    };
    function displayGifs() {
        var term = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=8uW2w5RcnSMn8ltX5jYkG3Rr2i5I50Qw&limit=5";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL);
            $("#gifs-view").empty();
            for (var i = 0; i < response.data.length; i++) {
                var gifImg = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
                gifImg.addClass('gif');

                var gifDiv = $("<div class='gif-div'>");
                gifDiv.html("<p>Rating: " + response.data[i].rating + "</p>");

                var imgDiv = $("<div class='play'>");
                imgDiv.attr("data-state", "still");
                imgDiv.attr("data-name", term);
                imgDiv.attr("data-still", response.data[i].images.fixed_height_still.url);
                imgDic.attr("data-animate", response.data[i].images.fixed_height.url);

                $(imgDiv).append(gifImg);
                $(gifDiv).append(imgDiv);
                $("#gifs-view").append(gifDiv);
            }



        });
    };



    $("#kpop-button").on("click", function (event) {
        event.preventDefault();
        var term = $("#kpop-input").val().trim();
        kPop.push(term);
        createButtons();

    });

    $(".gif").on("click", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    console.log(kPop[i]);
    createButtons();
    displayGifs();
});
