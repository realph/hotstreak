(function() {
    'use strict';

    angular
        .module('app.search')
        .run(appRun);

    // appRun.$inject = ['routehelper']

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/search',
                config: {
                    templateUrl: 'app/search/search.html',
                    controller: 'SearchPersonController',
                    controllerAs: 'vm',
                    title: 'search',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Search'
                    }
                }
            }
        ];
    }
})();
