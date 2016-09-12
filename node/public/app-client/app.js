myApp = angular.module('todoApp', [
  'ngRoute',
  'ngAnimate',
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .otherwise({redirectTo: '/index'});
}])
.factory('socket', ['$rootScope', function($rootScope) {
  // Cambiar a localhost:8080 cuando se esté en local
  var serverUri = 'localhost:8080';

  var socket = io.connect(serverUri, {'transports': ['websocket', 'polling']});
  console.log('Socket connected');
  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    }
  };
}]);
