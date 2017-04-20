document.getElementById('search').addEventListener('submit', function(e) {
  e.preventDefault();
});

var key = "https://api.themoviedb.org/3/movie/550?api_key="


function collectQuery() {
  var field = document.getElementById('searchField').value;
  sendData(field);
  document.getElementById('search').reset();
}

function sendData(searchQuery) {

  let httpReq = "https://www.omdbapi.com/?t="
  let query = searchQuery;

  axios.get(httpReq + query)
    .then(function(response) {
      let title = response.data.Title;
      let year = response.data.Year;
      let description = response.data.Plot;
      let poster = response.data.Poster;
      let link = response.data.imdbID;
      let imdbRating = response.data.Ratings[0].Value;
      let rtRating = response.data.Ratings[1].Value;
      let mcRating = response.data.Ratings[2].Value;
      let rating = Number(imdbRating.slice(0, 3));
      renderMovie(title, year, description, poster, link);
      renderVerdict(imdbRating, rtRating, mcRating, rating);
    })
    .catch(function(error) {
      console.log(error);
    });

}

function renderVerdict(imdb, rt, mc, total) {
  let quality = determineQuality(total);
  let verdictOutput = document.getElementById('verdict')
  verdictOutput.innerHTML =
  `
    <div class = "imdb">
    <p class="site">IMDb Rating</p>
    <p class="score">${imdb}</p>
    </div>
    <div class = "rt">
    <p class="site">Rotten Tomatoes</p>
    <p class="score">${rt}</p>
    </div>
    <div class = "mc">
    <p class="site">Metacritic Score</p>
    <p class="score">${mc}</p>
    </div>
    <div id = "verdict">
    <h1>VERDICT</h1>
    <h3>${quality}</h3>
    </div>
    `

}

function determineQuality(rating) {
  if (rating > 8.0) {
    return (
      '<h3 class="spectacular"> Spectacular movie. A must watch </h3>'
    )
  } else if (rating > 7.0) {
    return (
      '<h3 class="great"> Great watch </h3>'
    )
  } else if (rating > 6.0) {
    return (
      '<h3 class="okay"> Not the best of movies </h3>'
    )
  } else if (rating > 5.0) {
    return (
      '<h3 class="bad"> Just terrible. Don\'t waste your time </h3>'
    )
  } else {
    return (
      '<h3 class="error"> Doesn\'t even exist.' + rating + ' Check your spelling </h3>'

    )
  }
}

function renderMovie(title, year, description, poster, link, rating, quality) {

  let outputArea = document.getElementById('output');
  outputArea.innerHTML =
    '<img src="' + poster + '">' +

    '<h1>' + title + ' ' + '(' + year + ')' + '</h1>' +
    '<hr>' +
    '<p>' + description + '</p>' +
    '<a target="_blank" href="http://www.imdb.com/title/' + link + '"><button>More info</button></a>';
}
