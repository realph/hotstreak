(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('ccAutofocus', ccAutofocus);

    /* @ngInject */
    function ccAutofocus ($timeout) {
        // The HTML autofocus property can be finicky when used with Angular. Use this directive instead.
        // Courtesy of mlynch: https://gist.github.com/mlynch/dd407b93ed288d499778
        // Usage:
        //  <input type="text" autofocus>
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            $timeout(function() {
              element[0].focus();
            });
        }
    }
})();
