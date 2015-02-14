app.controller('Ctrl5', function($scope) {
  $scope.roles = {
    g: 'Guest',
    u: 'User',
    c: 'Customer',
    a: 'Administrator'
  };

    $scope.testValue = 'Im not changed yet!';
    $scope.imChanged = function(){
        $scope.testValue = $scope.user.roles.join(',');
    }

  $scope.user = {
    roles: ['c']
  };

  $scope.checkFirst = function() {
    $scope.user.roles.splice(0, $scope.user.roles.length); 
    $scope.user.roles.push('a');
  };
});