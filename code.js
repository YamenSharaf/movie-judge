document.getElementById('search').addEventListener('submit', function(e) {
  e.preventDefault();
});

var key = "https://api.themoviedb.org/3/movie/550?api_key="

function collectQuery() {
  var field = document.getElementById('searchField').value;
  if (field == '') {
    spinner.error();
  } else {
    clearAll();
    spinner.show();
    sendData(field);
    document.getElementById('search').reset();
  }

}

function sendData(searchQuery) {

  let httpReq = "https://www.omdbapi.com/?t="
  let query = searchQuery;

  axios.get(httpReq + query).then(function(response) {
    ratingArr = response.data.Ratings;
    if (ratingArr.length !== 3) {
      spinner.error();
    } else {
      let title = response.data.Title;
      let year = response.data.Year;
      let description = response.data.Plot;
      let poster = response.data.Poster;
      let link = response.data.imdbID;
      let imdbRating = response.data.Ratings[0].Value;
      let rtRating = response.data.Ratings[1].Value;

      let mcRating = response.data.Ratings[2].Value;
      let rating = Number(imdbRating.slice(0, 3));
      spinner.hide();
      renderMovie(title, year, description, poster, link);
      renderVerdict(imdbRating, rtRating, mcRating, rating);
    }

  }).catch(function(error) {
    console.log(error);
  });

}

function renderVerdict(imdb, rt, mc, total) {
  let quality = determineQuality(total);
  let verdictOutput = document.getElementById('verdict')
  verdictOutput.innerHTML = `
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
    return ('<h3 class="spectacular"> Spectacular movie. A must watch </h3>')
  } else if (rating > 7.0) {
    return ('<h3 class="great"> Great watch </h3>')
  } else if (rating > 6.0) {
    return ('<h3 class="okay"> Not the best of movies </h3>')
  } else if (rating > 5.0) {
    return ('<h3 class="bad"> Just terrible. Don\'t waste your time </h3>')
  } else {
    return ('<h3 class="error"> Doesn\'t even exist.' + rating + ' Check your spelling </h3>')
  }
}

function renderMovie(title, year, description, poster, link, rating, quality) {

  let outputArea = document.getElementById('output');
  outputArea.innerHTML = '<img src="' + poster + '">' + '<h1>' + title + ' ' + '[' + year + ']' + '</h1>' + '<hr>' + '<p>' + description + '</p>' + '<a target="_blank" href="http://www.imdb.com/title/' + link + '"><button>More info</button></a>';
}

var spinner = {
  show: function() {
    document.getElementById('center').innerHTML =
  `<div class="sk-cube-grid">
  <div class="sk-cube sk-cube1"></div>
  <div class="sk-cube sk-cube2"></div>
  <div class="sk-cube sk-cube3"></div>
  <div class="sk-cube sk-cube4"></div>
  <div class="sk-cube sk-cube5"></div>
  <div class="sk-cube sk-cube6"></div>
  <div class="sk-cube sk-cube7"></div>
  <div class="sk-cube sk-cube8"></div>
  <div class="sk-cube sk-cube9"></div>
</div>`
  },
  hide: function() {
    document.getElementById('center').innerHTML = ''
  },
  error() {
    clearAll();
    document.getElementById('center').innerHTML =
    `<p>Please enter a valid movie or check your spelling</p>`
  }
}

function clearAll() {
  document.getElementById('verdict').innerHTML = ''
  document.getElementById('output').innerHTML = ''

}
