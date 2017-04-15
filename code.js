document.getElementById('search').addEventListener('submit', function(e) {
  e.preventDefault();
});

var key = "https://api.themoviedb.org/3/movie/550?api_key="


function collectQuery() {
  var field = document.getElementById('searchField').value
  sendData(field);
  document.getElementById('search').reset();
}

function sendData(searchQuery) {

  let httpReq = "http://www.omdbapi.com/?t="
  let httpTvReq = "https://api.themoviedb.org/3/search/tv?api_key="
  let query = searchQuery;

  axios.get(httpReq + query)
  .then(function (response) {
    let title = response.data.Title;
    let year = response.data.Year;
    let description = response.data.Plot;
    let poster = response.data.Poster;
    let link = response.data.imdbID;
    let rating = response.data.imdbRating;
    let quality = determineQuality(rating);
    renderMovie(title, year, description, poster, link, rating, quality);
  })
  .catch(function (error) {
    console.log(error);
  });

}

function determineQuality(rating) {
  numRating = Number(rating);
  if (numRating > 8.0 ) {
    return (
      '<h3 class="text-success"> Spectacular movie </h3>'
    )
  } else if (numRating > 7.0) {
    return (
      '<h3 class="text-success"> Great movie </h3>'
    )
  } else if (numRating > 6.0 ) {
    return (
      '<h3 class="text-primary"> Okay movie </h3>'
    )
  } else {
    return (
    '<h3 class="text-danger"> Bad Movie </h3>'
  )
  }
}

function renderMovie(title, year, description, poster, link, rating, quality) {

  let outputArea = document.getElementById('output');
  outputArea.innerHTML += '<div class="col-md-4">'
  +'<div class="card text-center">'
  + '<img class="card-img-top" src="'+ poster +'">'
  +'<div class="card-block" id="result">'
  + '<h1 class="card-title">'  +title+ ' ' + '(' +year+ ')'+   '</h1>'
  + quality
  + '<hr>'
  + '<p class="card-text">' + description + '</p>'
  + '<a target="_blank" href="http://www.imdb.com/title/'+ link +'" class="btn btn-warning">More info</a>'
  + '</div>'
  + '</div>'
  + '</div>';
}
