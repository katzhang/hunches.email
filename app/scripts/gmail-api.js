var gmailApi = gmailApi || {};

(function() {
	console.log('gmail-api.js loaded');

	var clientId = '481653505775-tvpdbhtbmmpf7fasgnm8o69ro31fou40.apps.googleusercontent.com';
	var apiKey = 'AIzaSyAH8RDk8TZmMN1LuVdgW1w4ixpJWE94dSg';
	var scopes = 'https://www.googleapis.com/auth/gmail.readonly';

	gmailApi.auth = function() {
		var config = {
			'client_id': clientId,
			'scope': scopes
		};

		gapi.auth.authorize(config, function() {
			console.log('auth complete');
		});
	}

	gmailApi.checkAuth = function() {
		gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, gmailApi.handleAuthResult);
	}

	gmailApi.handleAuthResult = function(authResult) {
		var authorizeButton = document.getElementById('authorize-button');
		console.log('handleAuthResult');
		if (authResult && !authResult.error) {
			authorizeButton.style.visibility = 'hidden';
			gmailApi.makeApiCall();
		} else {
			authorizeButton.style.visibility = '';
			authorizeButton.onclick = gmailApi.handleAuthClick;
		}
	}

	gmailApi.handleAuthClick = function(event) {
		gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, gmailApi.handleAuthResult);
		return false;
	}

	gmailApi.makeApiCall = function() {
		gapi.client.load('gmail', 'v1', function() {
			var request = gapi.client.gmail.users.messages.list({
				'userId': 'me'
			})

			request.execute(function(response) {
				console.log(response);
			})
		})
	}

})()
