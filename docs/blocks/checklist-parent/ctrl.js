app.controller('Ctrl5', function($scope) {
  $scope.roles = [
    { id: 1, name: 'Guest' },
    { id: 2, name: 'User' },
    { id: 3, name: 'Admin' }
  ];
  $scope.user = {
    roles: [2]
  };
  $scope.roleProperty = 'id';

  $scope.checkAll = function() {
    $scope.user.roles = $scope.roles.map(function (item) {
      return item[$scope.roleProperty];
    });
  };
  $scope.uncheckAll = function() {
    $scope.user.roles = [];
  };
  $scope.checkFirst = function() {
    $scope.user.roles.splice(0, $scope.user.roles.length); 
    $scope.user.roles.push(1);
  };
});