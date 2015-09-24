(function() {
    'use strict';

    angular
        .module('app.now')
        .run(appRun);

    // appRun.$inject = ['routehelper']

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/now/:person',
                config: {
                    templateUrl: 'app/now/now.html',
                    controller: 'NowPlayingMovieListController',
                    controllerAs: 'vm',
                    reloadOnSearch: false,
                    title: 'now',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Now'
                    }
                }
            }
        ];
    }
})();
