// script sidebar toggled
$('#menu-toggle').click(function (event) {
  event.preventDefault();
  $('#wrapper').toggleClass('toggled');
});

$(document).ready(() => {
  // obteniendo elementos del DOM
  var sectionHome = $('#home-search');
  var btnSearch = $('#search-btn');
  var inputTextSearch = $('#input-search');
  var itemHome = $('#v-pills-home-tab');  
  var itemDrama = $('.drama');
  var itemAction = $('.action');
  var itemAdventure = $('.adventure');
  var itemAnimation = $('.animation');
  var itemComedy = $('.comedy');
  var itemHorror = $('.horror');
  var itemRomance = $('.romance');
  var titleModal = $('.title-movie');
  var synopsisModal = $('#synopsis');
  var actorsModal = $('#actors');
  var releaseDatesModal = $('#release-dates');
  var voteAverageModal = $('#vote-average');
  var imgModal = $('#img-modal');
  var trailerMovie = $('#trailer-movie');

  // construir vista incial (seccion HOME) al cargar la página
  function getBestMoviesSectionHome() {
    var popularMoviesData = 'https://api.themoviedb.org/3/discover/movie?api_key=5076f0f992d07860e10ee70c4f034e5e&sort_by=popularity.desc';
    $.getJSON(popularMoviesData)
      .then((result) => {
        console.log(result);
        let movies = result.results;
        let moviesHtml = '';
        $.each(movies, (index, movie) => {
          moviesHtml += `
        <div class="col-6 col-sm-4 col-md-2">
          <div class="text-center">
            <img src="http://image.tmdb.org/t/p/w185/${movie.poster_path}" class="img-fluid selected-movie" data-id="${movie.id}" data-toggle="modal" data-api="tmdb" data-target=".bd-example-modal-lg">
            <h5>${movie.title}</h5>
          </div>
        </div>
      `;
        });
        $(sectionHome).html(moviesHtml);
        $('.selected-movie').click(function (event) {
          event.preventDefault();
          console.log('hice click');
          var id = $(this).attr('data-id');
          var nameApi = $(this).attr('data-api');
          getMovieData(id, nameApi);
        });
      }).catch((err) => {
        console.log(err);
      });;
  }

  // asociando eventos a elementos del DOM
  itemHome.on('click', getBestMoviesSectionHome)
  btnSearch.on('click', (event) => {
    event.preventDefault();
    if (inputTextSearch.val()) {
      getMovies(inputTextSearch.val());
    };
  });

  itemDrama.on('click', searchDataGenre);
  itemAction.on('click', searchDataGenre);
  itemAdventure.on('click', searchDataGenre);
  itemAnimation.on('click', searchDataGenre);
  itemComedy.on('click', searchDataGenre);
  itemHorror.on('click', searchDataGenre);
  itemRomance.on('click', searchDataGenre);

  // traer todas las peliculas relacionadas a lo que el usuario escribio en el input
  function getMovies(searchText) {
    $.getJSON('http://www.omdbapi.com?s=' + encodeURI(searchText) + '&apikey=bea6c355')
      .then((response) => {
        console.log(response);
        let movies = response.Search;
        let moviesHtml = '';
        $.each(movies, (index, movie) => {
          moviesHtml += `
          <div class="col-6 col-sm-4 col-md-2">
            <div class="well text-center">
              <img src="${movie.Poster}" class="img-fluid selected-movie" data-id="${movie.imdbID}" data-toggle="modal" data-api="omdb" data-target=".bd-example-modal-lg">
              <h5>${movie.Title}</h5>
            </div>
          </div>
        `;
        });

        $('#home-search').html(moviesHtml);
        console.log($('.selected-movie'));
        $('.selected-movie').click(function (event) {
          event.preventDefault();
          console.log('hice click');
          var id = $(this).attr('data-id');
          var nameApi = $(this).attr('data-api');
          getMovieData(id, nameApi);
        });
      })
      .catch((err) => {
        console.log(err);
      });
      inputTextSearch.val('');
  }

  // obtener peliculas segun el genero seleccionado
  function searchDataGenre() {
    var codeGenre = $(this).attr('data-code');
    var nameSectionTab = '.' + $(this).attr('aria-controls');
    console.log(codeGenre);
    console.log(nameSectionTab);
    $.getJSON('https://api.themoviedb.org/3/discover/movie?with_genres=' + codeGenre + '&api_key=5076f0f992d07860e10ee70c4f034e5e')
      .then((result) => {
        console.log(result);
        let movies = result.results;
        let moviesHtml = '';
        $.each(movies, (index, movie) => {
          moviesHtml += `
          <div class="col-6 col-sm-4 col-md-2">
            <div class="text-center">
              <img src="http://image.tmdb.org/t/p/w185/${movie.poster_path}" class="img-fluid selected-movie" data-id="${movie.id}" data-toggle="modal" data-api="tmdb" data-target=".bd-example-modal-lg">
              <h5>${movie.title}</h5>
            </div>
          </div>
        `;
        });
        $(nameSectionTab).html(moviesHtml);
        $('.selected-movie').click(function (event) {
          event.preventDefault();
          console.log('hice click');
          var id = $(this).attr('data-id');
          var nameApi = $(this).attr('data-api');
          getMovieData(id, nameApi);
        });
      }).catch((err) => {
        console.log(err);
      });
  };

  // funcion para mostrar la informacion de la pelicula seleccionada
  function getMovieData(id, nameApi) {
    if (nameApi === 'tmdb') {
      var dataMovie = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=5076f0f992d07860e10ee70c4f034e5e';
      var creditMovieData = 'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=5076f0f992d07860e10ee70c4f034e5e';
      var trailerMovieData = 'https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=5076f0f992d07860e10ee70c4f034e5e';
      var listCastMovie = [];
      var trailerYoutubeKey;
      var youtubeURL = 'https://www.youtube.com/embed/';
      $.getJSON(creditMovieData)
        .then((result) => {
          console.log(result);
          for (let index = 0; index < 11; index++) {
            const nameCast = result['cast'][index]['name'];
            listCastMovie.push(nameCast);
          }
        });
      $.getJSON(trailerMovieData)
        .then((result) => {
          console.log(result);
          for (let index = 0; index < result.results.length; index++) {
            if (result.results[index]['type'] === 'Trailer') {
              trailerYoutubeKey = result.results[index]['key'];
              break;
            }
          }
        });
      $.getJSON(dataMovie)
        .then((result) => {
          console.log(result);
          listCastMovie = listCastMovie.toString();
          console.log(listCastMovie);
          titleModal.text(result.title);
          imgModal.attr('src', 'http://image.tmdb.org/t/p/w185/' + result.poster_path);
          synopsisModal.text(result.overview);
          actorsModal.text(listCastMovie);
          voteAverageModal.text(result.vote_average);
          releaseDatesModal.text(result.release_date);
          $('#view-trailer').css('display', 'block');
          trailerMovie.css('display', 'block');          
          trailerMovie.attr('src', youtubeURL + trailerYoutubeKey);
        });
    } else if (nameApi === 'omdb') {
      $.getJSON('http://www.omdbapi.com?i=' + id + '&apikey=bea6c355')
        .then((result) => {
          console.log(result);
          let movie = result.data;
          console.log(movie);
          titleModal.text(result['Title']);
          imgModal.attr('src', result['Poster']);
          synopsisModal.text(result['Plot']);
          actorsModal.text(result['Actors']);
          voteAverageModal.text(result.imdbRating);
          releaseDatesModal.text(result['Released']);
          $('#view-trailer').css('display', 'none');          
          trailerMovie.css('display', 'none');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  getBestMoviesSectionHome();
});