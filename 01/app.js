(function() {
  'use strict';

  angular.module('PrefixApp', []);

  angular.module('PrefixApp')
  .controller('prefixAppCtrl', prefixAppCtrl);

  prefixAppCtrl.$inject = ['$scope'];

  function prefixAppCtrl($scope) {
    $scope.title = 'Restrict, Replace and Template';
  }

  angular.module('PrefixApp')
  .directive('prefixAppDirective', prefixAppDirective);

  prefixAppDirective.$inject = [];

  function prefixAppDirective() {
    /**
     * Returns a DDO:
     *   Directive Definition Object providing instructions to the compiler.
     */
    return {
      /**
       * E - Element name (default): <my-directive></my-directive>
       * A - Attribute (default): <div my-directive="exp"></div>
       * C - Class: <div class="my-directive: exp;"></div>
       * M - Comment: <!-- directive: my-directive exp -->
       */
      restrict: 'EACM',
      /**
       * Defaults to false.
       */
      replace: true, // Valid because we have one root element (It's required by Comment)
      template: '<header><h1>{{title}}</h1></header>',
    };
  }
})();
