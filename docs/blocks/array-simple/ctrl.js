app.controller('Ctrl1', function($scope) {
  $scope.roles = [
    'guest', 
    'user', 
    'customer', 
    'admin'
  ];
  $scope.user = {
    roles: ['user']
  };
});