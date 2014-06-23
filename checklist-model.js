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
          break;
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
        setter(scope.$parent, add(current, value));
      } else {
        setter(scope.$parent, remove(current, value));
      }
    });

    // watch original model change
    scope.$parent.$watch(attrs.checklistModel, function(newArr, oldArr) {
      scope.checked = contains(newArr, value);
      elem[scope.checked ? 'addClass' : 'removeClass']('checked');
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
      
      // local scope var storing individual checkbox model
      tElement.attr('ng-model', 'checked');

      return postLinkFn;
    }
  };
}])
/**
 * Parent checkbox styled button for a checklist model directive.
 * @param {array} checklist: analogous to checklist-model list
 * @param {array} collection: list of original elements
 * @param {string} itemProperty: property to add to checklist (needs to be already evaluated)
 */
.directive('checklistParent', function () {
  return {
    scope: { checklist: '=', collection: '=', itemProperty: '@' },
    template: '<button class="checkbox" ng-click="toggleCheck()" ng-class="{\'checked\': allToggled}"></button>',
    replace: true,
    link: function ( scope, element ) {
      scope.allToggled = false;

      // Watches for changes on the checklist
      scope.$watch('checklist', function(newArr, oldArr) {
        if ( newArr.length === scope.collection.length )
          scope.allToggled = true;
        else
          scope.allToggled = false;
      }, true);

      scope.toggleCheck = function () {
        scope.allToggled = !scope.allToggled;
        (scope.allToggled ? scope.checkAll : scope.uncheckAll)();
      };
      scope.checkAll = function () {
        scope.checklist = scope.collection.map(function (item) {
          return item[scope.itemProperty];
        });
      };
      scope.uncheckAll = function () {
        scope.checklist = [];
      };
    }
  };
});
