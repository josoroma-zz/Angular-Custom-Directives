(function() {
  'use strict';

  angular.module('PrefixApp', []);

  angular.module('PrefixApp')
    .controller('prefixAppCtrl', prefixAppCtrl);

  prefixAppCtrl.$inject = [];

  function prefixAppCtrl() {
    var data = this;

    data.username = 'transclusion';
    data.image = 'http://fakeimg.pl/280x280/FFC200/000/?text=JS';
    data.about = 'We typically use transclusion when we want to wrap arbitrary content in our custom directive.';
  }

  angular.module('PrefixApp')
    .directive('prefixAppCardDirective', prefixAppCardDirective);

  prefixAppCardDirective.$inject = [];

  function prefixAppCardDirective() {
    return {
      transclude: true,
      scope: {},
      controllerAs: 'ctrl',
      bindToController: {
        username: '=',
        image: '=',
      },
      templateUrl: 'prefixAppCardPartial',
      controller: function() {},
    };
  }

  angular.module('PrefixApp')
    .directive('prefixAppLifecycleDirective', prefixAppLifecycleDirective);

  prefixAppLifecycleDirective.$inject = [];

  function prefixAppLifecycleDirective() {
    return {
      transclude: true,
      scope: {},
      controllerAs: 'ctrl',
      bindToController: {
        username: '=',
        image: '=',
      },
      templateUrl: 'prefixAppLifecyclePartial',
      controller: function($element, $transclude) {
        var ctrl = this;
        var content = $element.find('.content');
        var transcludedScope;

        ctrl.expand = function() {
          // It creates a transclusion scope for us.
          $transclude(function(transElement, transScope) {
            content.append(transElement);
            transcludedScope = transScope;

            // Optional - Callable outside this directive.
            transScope.prefixAppLifecycleCollapse = ctrl.collapse;
          });

          ctrl.expanded = true;
        };

        ctrl.collapse = function() {
          // Let's destroy the transclusion scope.
          transcludedScope.$destroy();
          transcludedScope = null;
          content.empty();

          ctrl.expanded = false;
        };

      },
    };
  }
})();
