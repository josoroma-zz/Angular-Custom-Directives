(function() {
  'use strict';

  angular.module('PrefixApp', []);

  angular.module('PrefixApp')
  .controller('prefixAppCtrl', prefixAppCtrl);

  prefixAppCtrl.$inject = ['$scope'];

  function prefixAppCtrl($scope) {
    $scope.name = 'Identify Things';
    $scope.color = '#CC0000';

    $scope.reverseName = function() {
      $scope.name = $scope.name.split('').reverse().join('');
    };

    $scope.randomColor = function() {
      $scope.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    };
  }

  /**
   * Isolated Scope => {} => Object Literal
   *
   * We have a new scope created for the directive and it will not be inherited
   * from the parent scope. This new scope also known as Isolated scope because
   * it is completely detached from its parent scope.
   *
   *  Prefixes are used to bind the parent scope’s methods and properties to the
   *  directive scope:
   *
   *   "@"  =>  Text Binding / One-way Binding
   *   "="  =>  Direct Nodel Binding / Two-way Binding
   *   "&"  =>  Behaviour Binding / Method Binding
   *
   * Resource: Mastering the Scope of the Directives in AngularJS by Shidhin C R
   */
  angular.module('PrefixApp')
  .directive('prefixAppDirective', prefixAppDirective);

  prefixAppDirective.$inject = [];

  function prefixAppDirective() {
    // Returning a DDO (Directive Definition Object)
    return {
      restrict: 'EA',
      scope: {
        name: '=',      // When "@" parent name isn't binded
        color: '=',     // Two-way Binding
        reverse: '&',   // Let's give some functionality/Expression to our Directive
      },
      template: [
        '<div class="line">',
          '{{name}} <input type="text" ng-model="name">',
        '</div>',
        '<div class="line">',
          '<strong style="color:{{color}}">{{color|uppercase}}</strong> <input type="text" ng-model="color">',
        '</div>',
        '<div class="line">',
          '<input type="button" ng-click="reverse()" value="Reverse Name"/>',
        '</div>',
      ].join(''),
    };
  }
})();
