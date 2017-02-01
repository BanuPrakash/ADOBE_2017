(function() {
	var ng = angular.module("main_module",
            ["customer_module","ngRoute","authentication_module"]);

	ng.config(function($routeProvider, $locationProvider){
		$routeProvider
		.when("/login", {
                'templateUrl': 'app/page/login.html',
                'controller': function($scope, $location, AuthenticationService) {
                    $scope.login = function() {
                        AuthenticationService.login($scope.username, $scope.password,
                            function(response) {
                                if (response.success) {
                                    AuthenticationService.setCredentials(
                                        $scope.username, $scope.password);
                                    $location.path('/');
                                } else {
                                    alert(response.message);
                                    $location.path('/login');
                                }
                            });
                    };
                }
            })
		 .when("/", {
			template : '<h1>Home Sweet Home!!!</h1>'
		})
		.when("/customers", {
			templateUrl : 'app/page/customer.html'
		})
		.when("/orders", {
			templateUrl : 'app/page/order.html',
			controller: function($scope, CustomerService) {
				CustomerService.getOrders().then(function(result) {
					$scope.orders = result;
				});
			}
		})

	}).run(check); //config

     function check($rootScope, $location, $cookieStore, $http) {
            $rootScope.globals = $cookieStore.get('globals') || {};

            $rootScope.$on('$locationChangeStart', function(event, next, current) {
                var restrictedPage =
                	 $.inArray($location.path(), ['/login', '/register']) === -1;

                var loggedIn = $rootScope.globals.username;
                if (restrictedPage && !loggedIn) {
                    $location.path('/login');
                }
            });
   }
})();