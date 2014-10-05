var gmailApi = gmailApi || {};

(function() {
	console.log('gmail-api.js loaded');

	var clientId = '481653505775-tvpdbhtbmmpf7fasgnm8o69ro31fou40.apps.googleusercontent.com';
	var apiKey = 'AIzaSyAH8RDk8TZmMN1LuVdgW1w4ixpJWE94dSg';
	var scopes = 'https://www.googleapis.com/auth/gmail.readonly';
	var hunchesLabel = 'hunches';
	var hunchesLabelId = '';

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
			gmailApi.loadApi();
		} else {
			authorizeButton.style.visibility = '';
			authorizeButton.onclick = gmailApi.handleAuthClick;
		}
	}

	gmailApi.handleAuthClick = function(event) {
		gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, gmailApi.handleAuthResult);
		return false;
	}

	gmailApi.loadApi = function() {
		gapi.client.load('gmail', 'v1', function() {
			console.log('gapi.client gmail api loaded');
			gmailApi.listLabels();
		})
	}

	gmailApi.listThreads = function(labelId) {
		var request = gapi.client.gmail.users.messages.list({
			'userId': 'me',
			'labelIds': labelId
		})

		request.execute(function(response) {
			console.log(response);
		})
	}

	gmailApi.listLabels = function() {
		var request = gapi.client.gmail.users.labels.list({
			'userId': 'me'
		})

		request.execute(function(response) {
			var labels = response.labels;
			hunchesLabelId = findId(labels, hunchesLabel);
			gmailApi.listThreads(hunchesLabelId);
		})
	}

	/* Helper Functions */
	function findId(array, name) {
		for(var i = 0; i < array.length; i++) {
			if (array[i].name == name) {
				return array[i].id;
			}
		}

		return false;
	}

})()
