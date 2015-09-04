(function() {
  'use strict';

  angular.module('PrefixApp', []);

  angular.module('PrefixApp')
    .controller('prefixAppCtrl', prefixAppCtrl);

  prefixAppCtrl.$inject = ['$scope'];

  function prefixAppCtrl($scope) {
    $scope.name = ' {{Default}} ';
  }

  angular.module('PrefixApp')
    .directive('lifecycleDirective', lifecycleDirective);

  lifecycleDirective.$inject = [];

  /**
   * Controller vs. Link
   */
  function lifecycleDirective() {
    return {
      restrict: 'E',

      template: '<p>Lifecycle: {{name}}</p>',

      /**
       * Before Compilation.
       *
       * Paramaters sent to the controller get there through Dependency Injection.
       *
       * Avoid putting DOM manipulation here.
       *
       * Am I just doing template and scope things?
       */
      controller: function($scope, $element, $attrs, $transclude) {
        console.info('controller("before")');
        console.log($element.html());

        $scope.name = $scope.name + ' {{Before Compilation}} ';

        console.log($scope);
      },

      /**
       * After Compilation.
       *
       * Parameters are standard order based funcitons.
       */
      link: function(scope, iElement, iAttrs, controller, transcludeFn) {
        console.info('link("after")');
        console.log(iElement.html());

        scope.name = scope.name + ' {{After Compilation}} ';

        console.log(scope);
      },
    };
  }
})();
