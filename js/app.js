$(document).ready(function(){
  setTimeout(function(){
    $('#splash').fadeOut(700);}, 2000);

      setTimeout(function() {
        $('#splash2').fadeOut(900, function() {
          window.location.href = 'views/home/index.html';
        });
      }, 5000);

});
class="btn btn-primary video-btn" data-toggle="modal" data-src="https://www.youtube.com/embed/Jfrjeg26Cwk" data-target="#myModal"
