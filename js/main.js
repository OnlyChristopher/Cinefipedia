// script sidebar toggled
$('#menu-toggle').click(function(event) {
  event.preventDefault();
  $('#wrapper').toggleClass('toggled');
});

$(document).ready(() => {
  // obteniendo elementos del DOM
  var inputSearch = $('#searchForm');
  var itemDrama = $('.drama');
  var itemAction = $('.action');
  var itemAdventure = $('.adventure');
  var itemAnimation = $('.animation');
  var itemComedy = $('.comedy');
  var itemHorror = $('.horror');
  var itemRomance = $('.romance');

  // asociando eventos a elementos del DOM
  inputSearch.on('submit', (event) => {
    event.preventDefault();
    let searchText = $('#searchText').val();
    getMovies(searchText);
  });

  itemDrama.on('click', searchDataGenre);
  itemAction.on('click', searchDataGenre);
  itemAdventure.on('click', searchDataGenre);
  itemAnimation.on('click', searchDataGenre);
  itemComedy.on('click', searchDataGenre);
  itemHorror.on('click', searchDataGenre);
  itemRomance.on('click', searchDataGenre);

  // obtner peliculas segun el genero seleccionado
  function searchDataGenre() {
    var codeGenre = $(this).attr('data-code');
    var nameSectionTab = '#' + $(this).attr('aria-controls');
    var idContentTab = '#' + nameSectionTab;
    console.log(codeGenre);
    console.log(nameSectionTab);
    $.getJSON('https://api.themoviedb.org/3/discover/movie?with_genres=' + codeGenre + '&api_key=5076f0f992d07860e10ee70c4f034e5e')
      .then((result) => {
        console.log(result);
        let movies = result.results;
        let moviesHtml = '';
        $.each(movies, (index, movie) => {
          moviesHtml += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="http://image.tmdb.org/t/p/w185/${movie.poster_path}">
              <h5>${movie.title}</h5>
              <a class="selected-movie" data-id="${movie.id}" href="#">Movie Details</a>
            </div>
          </div>
        `;
        });
        $(nameSectionTab).html(moviesHtml);
        console.log($('.selected-movie'));
        $('.selected-movie').click(function(event) {
          event.preventDefault();
          console.log('hice click');
          var id = $(this).attr('data-id');
          sessionStorage.setItem('movieId', id);
          var dataMovie = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=5076f0f992d07860e10ee70c4f034e5e';
          // window.location.href = 'movie.html';
          // return false;
        });
      }).catch((err) => {
        console.log(err);
      });
  };
});

// traer todas las peliculas relacionadas a lo que el usuario escribio en el input
function getMovies(searchText) {
  $.getJSON('http://www.omdbapi.com?s=' + encodeURI(searchText) + '&apikey=bea6c355')
    .then((response) => {
      console.log(response);
      let movies = response.Search;
      let moviesHtml = '';
      $.each(movies, (index, movie) => {
        moviesHtml += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a class="selected-movie" data-id= "${movie.imdbID}"; href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(moviesHtml);
      console.log($('.selected-movie'));
      $('.selected-movie').click(function(event) {
        event.preventDefault();
        console.log('hice click');
        var id = $(this).attr('data-id');
        sessionStorage.setItem('movieId', id);
        // window.location.href = 'movie.html';
        // return false;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');

  $.getJSON('http://www.omdbapi.com?i=' + movieId + '&apikey=bea6c355')
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
