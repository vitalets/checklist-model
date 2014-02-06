/**
 * Checklist-model
 * AngularJS directive for list of checkboxes
 */

angular.module('checklist-model', [])
.directive('checklistModel', ['$parse', '$compile', function($parse, $compile) {
  // contains
  function contains(arr, item) {
    if (angular.isArray(arr)) {
      for (var i = 0; i < arr.length; i++) {
        if (angular.equals(arr[i], item)) {
          return true;
        }
      }
    }
    return false;
  }

  // add
  function add(arr, item) {
    arr = angular.isArray(arr) ? arr : [];
    for (var i = 0; i < arr.length; i++) {
      if (angular.equals(arr[i], item)) {
        return arr;
      }
    }    
    arr.push(item);
    return arr;
  }  

  // remove
  function remove(arr, item) {
    if (angular.isArray(arr)) {
      for (var i = 0; i < arr.length; i++) {
        if (angular.equals(arr[i], item)) {
          arr.splice(i, 1);
          return;
        }
      }
    }
  }

  // http://stackoverflow.com/a/19228302/1458162
  function postLinkFn(scope, elem, attrs) {
    // compile with `ng-model` pointing to `checked`
    $compile(elem)(scope);
    // link to original model. Initially assigned in $watch
    var model;
    // need setter for case when original model not array
    var setter = $parse(attrs.checklistModel).assign;
    // value added to list
    var value = $parse(attrs.checklistValue)(scope.$parent);

    // watch UI checked change
    scope.$watch('checked', function(newValue, oldValue) {
      if (newValue === oldValue) { 
        return;
      } if (newValue === true) {
        // see https://github.com/vitalets/checklist-model/issues/11
        if (!angular.isArray(model)) {
          setter(scope.$parent, add([], value));
          // `model` will be updated in $watch
        } else {
          add(model, value);
        }
      } else if (newValue === false) {
        remove(model, value);
      }
    });

    // watch model change
    scope.$parent.$watch(attrs.checklistModel, function(newArr, oldArr) {
      // keep link with original model
      model = newArr;
      scope.checked = contains(newArr, value);
    }, true);
  }

  return {
    restrict: 'A',
    priority: 1000,
    terminal: true,
    scope: true,
    compile: function(tElement, tAttrs) {
      if (tElement[0].tagName !== 'INPUT' || !tElement.attr('type', 'checkbox')) {
        throw 'checklist-model should be applied to `input[type="checkbox"]`.';
      }

      if (!tAttrs.checklistValue) {
        throw 'You should provide `checklist-value`.';
      }

      // exclude recursion
      tElement.removeAttr('checklist-model');
      // local var storing individual checkbox model
      // scope.checked - will be set in $watch
      tElement.attr('ng-model', 'checked');

      return postLinkFn;
    }
  };
}]);
