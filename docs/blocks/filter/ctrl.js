app.controller('Ctrl6', function($scope) {
    $scope.users = [
        {id: 1, name: 'Aaron'},
        {id: 2, name: 'David'},
        {id: 3, name: 'Moses'}
    ];

    $scope.selectedUsers = [];

    $scope.compareFn = function(obj1, obj2){
        return obj1.id === obj2.id;
    };

    $scope.checkFirst = function() {
        $scope.selectedUsers = $scope.users[0];
    };

    $scope.checkAll = function() {
        $scope.selectedUsers = $scope.users;
    };

    $scope.uncheckAll = function() {
        $scope.selectedUsers = [];
    }
});