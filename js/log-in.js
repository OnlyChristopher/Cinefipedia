// Boostrap
$('#myModal').modal('show')

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBEtMWsBITOzOtJ2cvhm6pryCF1eEwM8nU",
    authDomain: "hackaton-a97af.firebaseapp.com",
    databaseURL: "https://hackaton-a97af.firebaseio.com",
    projectId: "hackaton-a97af",
    storageBucket: "hackaton-a97af.appspot.com",
    messagingSenderId: "10634710862"
  };
  firebase.initializeApp(config);
  // Registrando con google
    var user= null;

    var $loginBtn1 = $('#start-login-google');

    $loginBtn1.on('click', googleLogin);

    function googleLogin() {
      var provider1 = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider1).then(function(result) {
        user = result.user;
        console.log(user);
        window.location.href = '../home/index.html';
      });
      firebase.auth().onAuthStateChanged(function (user1) {
        if (user) {
          // User is signed in.
          firebase.database().ref('Users/' + user.uid).set({
            email: user.email,
            name: user.displayName,
            uid: user.uid,
            profilePicture: user.photoURL
          })
        } else {
          // User is signed out.
          console.log('usuario registrado correctamente');
          }
        });
          firebase.database().ref('post-comments/' + postId);
      commentsRef.on('child_added', function(data) {
        addCommentElement(postElement, data.key, data.val().text, data.val().author);
      });
    };

    // Registrando con facebook
    var $loginBtn2 = $('#start-login-facebook');

    $loginBtn2.on('click', facebookLogin);

    function facebookLogin() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
          user = result.user;
          console.log(user);
          window.location.href = '../home/index.html';
        }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        });
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            firebase.database().ref('Users/' + user.uid).set({
              email: user.email,
              name: user.displayName,
              uid: user.uid,
              profilePicture: user.photoURL
            })
          } else {
            console.log('usuario registrado correctamente');
            }
          });
            /*firebase.database().ref('post-comments/' + postId);
        commentsRef.on('child_added', function(data) {
          addCommentElement(postElement, data.key, data.val().text, data.val().author);
        });*/
      };

//Validando datos del Email
function begin() {
  function emailValid() {
    return !$('#email').hasClass('invalid') && ($('#email').val().trim().length !== 0);
  };

  function passwordValid() {
      return $('#password').val().length >= 6;
  };

  function checkboxValid() {
      return $('#gridCheck1').prop('checked');
  };

  function allOk() {
     return emailValid() && passwordValid();
  };

  $('#gridCheck1').on('change', function() {
    if (allOk()) {
      $('#btn-sign-up').removeAttr('disabled');
    } else {
      $(this).prop('checked', false);
    }
  });

  $('#btn-sign-up').on('click', function() {
    $('#showSignUp').text('Ya estas registrado, ahora inicia Sesión.');
  });

  //validacciones para el log-in con Email
  function emailAcces() {
    return !$('#email2').hasClass('invalid') && ($('#email').val().trim().length !== 0);
  };

  function passwordAcces() {
      return $('#password2').val().length >= 6;
    };

  function allOkAcces() {
    return emailAcces() && passwordAcces();
  };

  $('#password2').on('keyup', function() {
      if (allOkAcces()) {
        $('#btn-log-in').removeAttr('disabled');
      }
    });

  $('#btn-log-in').on('click', function() {
    $('#btn-log-in').attr('href', '../home/index.html');
  });
};

$(document).ready(begin);

// Vinculando con Email
function registrar() {
  var email = $('#email').val();
  var password = $('#password').val();

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
  // ...
});
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    firebase.database().ref('Users/' + user.uid).set({
      email: user.email,
      name: user.displayName,
      uid: user.uid,
      profilePicture: user.photoURL
    })
  } else {
    // User is signed out.
    console.log('usuario registrado correctamente');
    }
  });
};

function ingreso() {
  var email2 = $('#email2').val();
  var password2 = $('#password2').val();
  firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
  window.location.href = '../home/index.html';
};
var $imageUser = $('#img-user');
var $nameUser = $('#name-user');

function observador() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('existe usuario');
      //aparece();
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      $imageUser.attr('src', photoURL);
      $nameUser.text(displayName);
      // ...
    } else {
      // User is signed out.
      console.log('no existe usuario');
    }
  });
}

observador();

var $usersconect = $('.users');

// Mustra en pantalla los datos a publicar con los datos almacenados en firebase
firebase.database().ref('connected').on('value', function(snapshot) {
  var html = '';
  snapshot.forEach(function(e) {
    var element = e.val();
    var name = element.name;
    var email = element.email;
    html += '<li>' +
      '<img src="../assets/images/active.png" class="responsive-image" alt="active" width="10px">' +
      ' ' + name + ' </li>';
  });
  $($usersconect).append(html);
});

$('#btn-change').on('click', function(event) {
  event.preventDefault();
  if ($('#btn-change').val('hola')) {
    $('#btn-change').text('bye');
  }else if($('#btn-change').val('bye')) {
    $('#btn-change').text('hola');
  }
});
