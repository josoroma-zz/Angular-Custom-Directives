(function() {
  'use strict';

  angular.module('PrefixApp', []);

  angular.module('PrefixApp')
    .controller('prefixAppCtrl', prefixAppCtrl);

  prefixAppCtrl.$inject = [];

  function prefixAppCtrl() {
    var ctrl = this;

    ctrl.title = 'Hacking Transclusion';
    ctrl.body = 'Body Content to Transclude';
    ctrl.image = 'http://fakeimg.pl/280x280/FFC200/fff/?text=JS';
  }

  angular.module('PrefixApp')
    .directive('prefixAppDeferredDirective', prefixAppDeferredDirective);

  prefixAppDeferredDirective.$inject = [];

  function prefixAppDeferredDirective() {
    return {
      transclude: true,
      scope: {},
      controllerAs: 'ctrl',
      bindToController: {
        title: '=',
        image: '=',
      },
      templateUrl: 'prefixAppDeferredPartial',
      /**
       * Controller constructor function. The controller is instantiated before
       * the pre-linking phase and it is shared with other directives (require).
       * This allows the directives to communicate with each other and augment
       * each other's behavior. The controller is injectable (and supports
       * bracket notation).
       */
      controller: function($element, $transclude) {
        var ctrl = this;
        var content = $element.find('.content');
        var transcludedScope;

        ctrl.expand = function() {
          // Remember: It creates a Transclusion Scope for us.
          $transclude(function(transElement, transScope) {
            content.append(transElement);
            transcludedScope = transScope;

            // Optional - Callable outside this directive.
            transScope.prefixAppDeferredCollapse = ctrl.collapse;
          });

          ctrl.expanded = true;
        };

        ctrl.collapse = function() {
          // Remember: Let's destroy the transclusion scope.
          transcludedScope.$destroy();
          transcludedScope = null;
          content.empty();

          ctrl.expanded = false;
        };

      },
    };
  }
})();
