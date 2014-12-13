/**
 * Created by Micha on 10/3/2014.
 */
var cs = angular.module("cesiumTest", [
    'ngRoute'
]);

cs.config(function ($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: '/Apps/app/views/main.html',
            controller: 'MainController'
        })
        .otherwise({
            redirectTo: "/main"
        });
});


