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
		gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
	}

	gmailApi.handleAuthResult = function() {
		
	}
})()