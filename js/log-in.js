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
    var user1 = null;

    var $loginBtn1 = $('#start-login-google');

    $loginBtn1.on('click', googleLogin);

    function googleLogin() {
      var provider1 = new firebase.auth.GoogleAuthProvider();

      //esta es la doc de firebase
      firebase
      .auth()
      .signInWithPopup(provider1)
      .then(function(result) {
        //guardamos el usuario que nos trae resuslt
        user = result.user1;
        //mostramos su contenido
        console.log(user1);
        //ocultamos el div de login
        window.location.href = 'home/index.html';
      });
    };

    // Registrando con facebook
   var user2 = null;

    var $loginBtn2 = $('#start-login-facebook');

    $loginBtn2.on('click', facebookLogin);

    function facebookLogin() {
      var provider2 = new firebase.auth.FacebookAuthProvider();

      //esta es la doc de firebase
      firebase
        .auth()
        .signInWithPopup(provider2)
        .then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          window.location.href = 'home/index.html';
        })
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        });

        firebase
        .auth()
        .getRedirectResult()
        .then(function(result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

      //Cerrar sesion
      firebase
      .auth()
      .signOut()
      .then(function() {
      // Sign-out successful.
      })
      .catch(function(error) {
      // An error happened.
    });

  };

// Vinculando con Email
function registrar() {
  var email = document.getElementById('email').value;
  var contrasena = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, contrasena).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
  // ...
});
}

function ingreso() {
  var email2 = document.getElementById('email2').value;
  var contrasena2 = document.getElementById('password2').value;
  firebase.auth().signInWithEmailAndPassword(email2, contrasena2).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
  window.location.href = 'home/index.html';
};

function observador() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('existe usuario');
      aparece();
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      console.log('no existe usuario');
    }
  });
}

observador();

/*------------direccionar a html -------------------*/
function aparece() {
  var showSignUp = document.getElementById('showSignUp');
  showSignUp.innerHTML = 'solo lo ve usuario activo';
  /*  window.location.href = 'views/home/index.html';*/
};
