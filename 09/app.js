(function() {
  'use strict';

  angular.module('PrefixApp', []);

  angular.module('PrefixApp')
  .directive('motherDirective', motherDirective);

  motherDirective.$inject = [];

  /**
  * What if we want to share some data to another directive applied to the same
  * DOM element? Directive’s Controller is designed for that. A controller is
  * a place where directive can define it’s Public API.
  */
  function motherDirective() {
    return {
      restrict: 'EA',

      template: [
        '<div class="topic">',
        ' {{greeting}}{{name}} ',
        '<daughter-directive></daughter-directive>',
        '</div>',
      ].join(''),

      controller: function($scope, $element, $attrs, $transclude) {
        this.name = ' Mother Controller ';
      },

      link: function(scope, iElement, iAttrs, controller, transcludeFn) {
        scope.name = controller.name;
        scope.greeting = ' Mother Link ';
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
      restrict: 'EA',

      require: '^motherDirective',

      template: [
        '<div class="topic">',
        ' {{daughterSays}} ',
        '</div>',
      ].join(''),

      link: function(scope, iElement, iAttrs, controller, transcludeFn) {
        scope.daughterSays = ' Daughter Link ' + controller.name;
      },
    };
  }
})();
