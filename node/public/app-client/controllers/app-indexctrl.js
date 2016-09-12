myApp
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/index', {
    templateUrl: '/app-client/views/app-index.html',
    controller: 'AppIndexCtrl'
  });
}])
.controller('AppIndexCtrl',function($scope, $http, socket) {

  $scope.newCustomers = [];
  $scope.currentCustomer = {};
  // Tareas para una de las tarjetas
  $scope.tasks = [];


  $scope.addTask = function() {

    socket.emit('add-task', $scope.task);

  };

  $scope.join = function() {
    socket.emit('add-customer', $scope.currentCustomer);
  };

  socket.on('notification', function(data) {
    $scope.$apply(function () {
      $scope.newCustomers.push(data.customer);
    });
  });

  socket.on('task_added', function(data) {
    $scope.$apply(function () {
      $scope.tasks.push(data.task.data);
      $scope.task.data = '';
    });
  });
});
