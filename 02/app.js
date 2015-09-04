(function() {
  'use strict';

  angular.module('DirectiveApp', []);

  angular.module('DirectiveApp')
  .controller('DirectiveAppCtrl', DirectiveAppCtrl);

  DirectiveAppCtrl.$inject = ['$scope'];

  function DirectiveAppCtrl($scope) {
    $scope.title = 'Scopes';
    $scope.body = 'No Scope, Scope and Isolated Scope';
  }

  /**
   * No Scope => Uses the Parent Scope Object
   */
  angular.module('DirectiveApp')
  .directive('dirNoScope', dirNoScope);

  dirNoScope.$inject = [];

  function dirNoScope() {
    return {
      restrict: 'E',
      template: '<article><h2>{{title}}</h2><div>{{body}}</div><div><input ng-model="title" type="text" name="title" placeholder="title"></div></article>',
    };
  }

  /**
   * scope: true => Has its Own Child Scope Object (Prototypal Inheritance)
   */
  angular.module('DirectiveApp')
  .directive('dirChildScope', dirChildScope);

  dirChildScope.$inject = [];

  function dirChildScope() {
    return {
      restrict: 'E',
      scope: true,
      template: '<article><h2>{{title}}</h2><div>{{body}}</div><div><input ng-model="title" type="text" name="title" placeholder="title"></div></article>',
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
   */
  angular.module('DirectiveApp')
  .directive('dirIsolatedScope', dirIsolatedScope);

  dirIsolatedScope.$inject = [];

  function dirIsolatedScope() {
    return {
      restrict: 'E',
      scope: {
        title: '@', // Value from an Attribute within a Directive
        body: '=',  // Direct Nodel Binding / Two-way Binding
      },
      template: '<article><h3>{{title}}</h3><p>{{body}}</p><div><input ng-model="title" type="text" name="title" placeholder="title"></div><div><input ng-model="body" type="text" name="body" placeholder="body"></div></article>',
    };
  }
})();
