/**
 * Checklist-model
 * AngularJS directive for list of checkboxes
 */

angular.module('checklist-model', [])
.directive('checklistModel', ['$parse', '$compile', function($parse, $compile) {
  // contains
  function contains(arr, item, compare) {
    if (angular.isArray(arr)) {
      for (var i = 0; i < arr.length; i++) {
        if (angular.isUndefined(compare)) {
          if (angular.equals(arr[i], item)) {
            return true;
          }
        } else {
          if (angular.equals(arr[i][compare], item[compare])) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // add
  function add(arr, item, compare) {
    arr = angular.isArray(arr) ? arr : [];
    for (var i = 0; i < arr.length; i++) {
      if (angular.isUndefined(compare)) {
        if (angular.equals(arr[i], item)) {
          return arr;
        }
      } else {
        if (angular.equals(arr[i][compare], item[compare])) {
          return arr;
        }
      }
    }
    arr.push(item);
    return arr;
  }

  // remove
  function remove(arr, item, compare) {
    if (angular.isArray(arr)) {
      for (var i = 0; i < arr.length; i++) {
        if (angular.isUndefined(compare)) {
          if (angular.equals(arr[i], item)) {
            arr.splice(i, 1);
            break;
          }
        } else {
          if (angular.equals(arr[i][compare], item[compare])) {
            arr.splice(i, 1);
            break;
          }
        }
      }
    }
    return arr;
  }

  // http://stackoverflow.com/a/19228302/1458162
  function postLinkFn(scope, elem, attrs) {
    // compile with `ng-model` pointing to `checked`
    $compile(elem)(scope);

    // getter / setter for original model
    var getter = $parse(attrs.checklistModel);
    var setter = getter.assign;

    // value added to list
    var value = $parse(attrs.checklistValue)(scope.$parent);

    // watch UI checked change
    scope.$watch('checked', function(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }
      var current = getter(scope.$parent);
      if (newValue === true) {
        setter(scope.$parent, add(current, value, attrs.checklistCompare));
      } else {
        setter(scope.$parent, remove(current, value, attrs.checklistCompare));
      }
    });

    // watch original model change
    scope.$parent.$watch(attrs.checklistModel, function(newArr, oldArr) {
      scope.checked = contains(newArr, value, attrs.checklistCompare);
    }, true);
  }

  return {
    restrict: 'A',
    priority: 1000,
    terminal: true,
    scope: true,
    compile: function(tElement, tAttrs) {
      if (tElement[0].tagName !== 'INPUT' || tAttrs.type !== 'checkbox') {
        throw 'checklist-model should be applied to `input[type="checkbox"]`.';
      }

      if (!tAttrs.checklistValue) {
        throw 'You should provide `checklist-value`.';
      }

      // exclude recursion
      tElement.removeAttr('checklist-model');

      // local scope var storing individual checkbox model
      tElement.attr('ng-model', 'checked');

      return postLinkFn;
    }
  };
}]);
