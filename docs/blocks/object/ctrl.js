app.controller('Ctrl4', function($scope) {
  $scope.roles = {
    g: 'Guest',
    u: 'User',
    c: 'Customer',
    a: 'Administrator'
  };
  $scope.user = {
    roles: ['c']
  };
  $scope.checkAll = function() {
    $scope.user.roles = Object.keys($scope.roles);
  };
  $scope.uncheckAll = function() {
    $scope.user.roles = [];
  };
  $scope.checkFirst = function() {
    $scope.user.roles.splice(0, $scope.user.roles.length); 
    $scope.user.roles.push('a');
  };
});