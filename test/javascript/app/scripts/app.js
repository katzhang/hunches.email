'use strict';

/**
 * @ngdoc overview
 * @name gmailApiTestApp
 * @description
 * # gmailApiTestApp
 *
 * Main module of the application.
 */
angular
  .module('gmailApiTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


var clientId = '481653505775';

var apiKey = 'AIzaSyAH8RDk8TZmMN1LuVdgW1w4ixpJWE94dSg';

var scopes = 'https://www.googleapis.com/auth/plus.me';


function auth() {
      var config = {
        'client_id': '481653505775-tvpdbhtbmmpf7fasgnm8o69ro31fou40.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/urlshortener'
      };
      gapi.auth.authorize(config, function() {
        console.log('login complete');
        console.log(gapi.auth.getToken());
      });
    }

function handleClientLoad() {
  // Step 2: Reference the API key
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  console.log('handleAuthResult');
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  // Step 3: get authorization to use private data
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  // Step 4: Load the Google+ API
  gapi.client.load('plus', 'v1', function() {
    // Step 5: Assemble the API request
    var request = gapi.client.plus.people.get({
      'userId': 'me'
    });
    // Step 6: Execute the API request
    request.execute(function(resp) {
      var heading = document.createElement('h4');
      var image = document.createElement('img');
      image.src = resp.image.url;
      heading.appendChild(image);
      heading.appendChild(document.createTextNode(resp.displayName));

      document.getElementById('content').appendChild(heading);
    });
  });
}

