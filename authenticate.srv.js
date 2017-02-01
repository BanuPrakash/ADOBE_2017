(function() {
	var app = angular.module('authentication_module', [ 'ngCookies' ]);
	app.service('AuthenticationService', function($http, $cookieStore,
			$rootScope) {
		this.login = function(username, password, callback) {
			if (username !== 'test' && password !== 'password') {
				response = {
					success : true
				};
			} else {
				response = {
					success : false,
					message : 'Username or password is incorrect'
				};
			}
			callback(response);
		}

		this.setCredentials = function(username, password) {
			$rootScope.globals = {
							username : username
			};

			$cookieStore.put('globals', $rootScope.globals);
		}

		this.clearCredentials = function() {
			$rootScope.globals = {};
			$cookieStore.remove('globals');
		}
	});
})();