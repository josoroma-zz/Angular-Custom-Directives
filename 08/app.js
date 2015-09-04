(function() {
  'use strict';

  angular.module('PrefixApp', []);

  angular.module('PrefixApp')
    .directive('compileDirective', compileDirective);

  compileDirective.$inject = [];

  /**
   * Compile should be used when we modify directive template, like add
   * new expression, append another directive inside this directive.
   */
  function compileDirective() {
    return {
      restrict: 'E',
      scope: true,
      compile: function(tElement, tAttrss) {
        angular.element(tElement).append('compile() {{name}}');

        return function postLink(scope, element, attrs) {
          scope.name = '{{Compile Directive}}';
        };
      },
    };
  }

  angular.module('PrefixApp')
    .directive('parentDirective', parentDirective);

  parentDirective.$inject = [];

  /**
   * Controller is used when we need to share or re-use $scope data. Or when
   * we want directives interacting with each other.
   *
   * Controllers allow directives talk to each other before they get fully
   * initialized.
   *
   * We can pass scope to child directive from parent to child using preLink
   * function. But there is a better way to do this via controller option.
   *
   * Am I just doing template and scope things?
   */
  function parentDirective() {
    return {
      restrict: 'E',
      scope: true,
      controller: function($scope) {
        $scope.name = '{{Parent Directive}}';
        $scope.say = function() {
          console.log('Inheritance => Relation => Extend => Share => Reuse => ' + $scope.name);
        };
      },
    };
  }

  angular.module('PrefixApp')
    .directive('childDirective', childDirective);

  childDirective.$inject = [];

  /**
   * Link is used when we need to attach an event handler or modify DOM.
   */
  function childDirective() {
    return {
      restrict: 'E',
      require: '^parentDirective',
      link: function(scope) {
        scope.name = '{{Child Directive}}';
        scope.say();
      },
    };
  }

  /* ------------------------------------------------------------------------ */
  /*                    Controller & Post-Link Pattern                        */
  /* ------------------------------------------------------------------------ */

  angular.module('PrefixApp')
  .directive('motherDirective', motherDirective);

  motherDirective.$inject = [];

  /**
  * Link is used when we need to attach an event handler or modify DOM.
  */
  function motherDirective() {
    return {
      restrict: 'E',

      controller: function($scope, $element, $attrs, $transclude) {
        $scope.name = '{{Mother Directive}}';
        $scope.greeting = 'Hello ' + $scope.name + '!';

        $scope.clickCompile = function() {
          alert('clickCompile');
        };

        $scope.clickPost = function() {
          alert('clickPost');
        };
      },

      compile: function(tElement, tAttrs) {
        tElement.append('<button ng-click="clickCompile();">clickCompile works</button>');

        return {
          post: function(scope, iElement, iAttrs, controller) {
            iElement.append('<button ng-click="clickPost();">clickPost does not works</button>');
          },
        };
      },
    };
  }

  angular.module('PrefixApp')
  .directive('daughterDirective', daughterDirective);

  daughterDirective.$inject = [];

  /**
  * Link is used when we need to attach an event handler or modify DOM.
  */
  function daughterDirective() {
    return {
      restrict: 'E',
      require: '^motherDirective', // Child Directive "require" the Parent Directive
      link: function(scope, iElement, iAttrs, controller, transcludeFn) {
        scope.daughterSays = '{{Daughter Directive}} inherits name from ' + scope.name;
      },
    };
  }
})();
