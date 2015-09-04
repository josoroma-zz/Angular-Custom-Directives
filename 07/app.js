(function() {
  'use strict';

  angular.module('PrefixApp', []);

  angular.module('PrefixApp')
    .directive('compileDirective', compileDirective);

  compileDirective.$inject = ['$rootScope'];

  function compileDirective($rootScope) {
    $rootScope.log = '';

    return {
      controller: function($scope, $attrs) {
        $rootScope.log = $rootScope.log + ($attrs.compileDirective + ' (Controller)\n');
      },

      compile: function compile(element, attributes) {
        $rootScope.log = $rootScope.log + (attributes.compileDirective + ' (Compile)\n');

        return {
          pre: function preLink(scope, element, attributes) {
            $rootScope.log = $rootScope.log + (attributes.compileDirective + ' (Pre-Link)\n');
          },

          post: function postLink(scope, element, attributes) {
            element.prepend(attributes.compileDirective);
            $rootScope.log = $rootScope.log + (attributes.compileDirective + ' (Post-Link)\n');
          },
        };
      },
    };
  }
})();
