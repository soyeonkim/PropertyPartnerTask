
'use strict';

/* App Module */

var martianRobotsApp = angular.module('MartianRobots', [
    'ngRoute',     
    'martianRobotsControllers'
    
]);


martianRobotsApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'partials/main.html',
                    controller: 'MainCtrl'
                });

        $locationProvider.html5Mode(false).hashPrefix('!');
    }]);

