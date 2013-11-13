app.controller('Ctrl4', function($scope) {
  $scope.roles = {
    q: 'Guest',
    u: 'User',
    c: 'Customer',
    a: 'Administrator'
  };
  $scope.user = {
    roles: ['c']
  };
});