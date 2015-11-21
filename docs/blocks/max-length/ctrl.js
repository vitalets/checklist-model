app.controller('Ctrl9', function($scope) {
  $scope.roles = [
    'guest', 
    'user', 
    'customer', 
    'admin'
  ];

  $scope.user = {
    roles: ['user']
  };
  
  $scope.allowedLength = 2;

});