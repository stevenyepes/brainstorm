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
  $scope.tasks_design = [];
  $scope.tasks_architecture = [];
  $scope.tasks_test = [];


  $scope.addDesingTask = function() {

    socket.emit('add-design-task', $scope.task.design);

  };

  $scope.addArchitectureTask = function() {

    socket.emit('add-architecture-task', $scope.task.architecture);

  };

  $scope.addTestTask = function() {

    socket.emit('add-test-task', $scope.task.test);

  };

  $scope.join = function() {
    socket.emit('add-customer', $scope.currentCustomer);
  };

  socket.on('notification', function(data) {
    $scope.$apply(function () {
      $scope.newCustomers.push(data.customer);
    });
  });

  socket.on('design-task-added', function(data) {
    $scope.$apply(function () {
      $scope.tasks_design.push(data.task);
      console.log(data);
      $scope.task.design = '';
    });
  });

  socket.on('architecture-task-added', function(data) {
    $scope.$apply(function () {
      $scope.tasks_architecture.push(data.task);
      console.log(data);
      $scope.task.architecture = '';
    });
  });

  socket.on('test-task-added', function(data) {
    $scope.$apply(function () {
      $scope.tasks_test.push(data.task);
      console.log(data);
      $scope.task.test = '';
    });
  });

});
