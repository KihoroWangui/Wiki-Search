$(document).ready(function () {
  $(document).keypress(function (e) {
    // Check if Enter key (13) is pressed
    if (e.which == 13) {
      // Construct the API link with user input
      let webLink =
        "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" +
        encodeURIComponent($("#search").val()) +
        "&utf8=&format=json";

      // Make an AJAX call to the Wikipedia API
      $.ajax({
        url: webLink,
        dataType: "jsonp",
        success: function (data) {
          // Remove previous results
          $(".searchResult").remove();

          // Loop through each search result and append it
          for (let i = 0; i < data.query.search.length; i++) {
            let titleForResult = data.query.search[i].title;
            let snippetForResult = data.query.search[i].snippet;

            // Append the search result
            $("#searchBox").append(
              `<a href="https://en.wikipedia.org/wiki/${encodeURIComponent(
                titleForResult
              )}" target="_blank" style="text-decoration:none">
                                <div class="searchResult">
                                    <span class="searchTitle">${titleForResult}</span><br />
                                    <span>${snippetForResult}...</span>
                                </div>
                            </a>`
            );
          }
        },
        error: function () {
          alert("An error occurred while fetching data.");
        },
      });
    }
  });
});
