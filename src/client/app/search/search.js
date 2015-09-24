(function() {
    'use strict';

    angular
        .module('app.search')
        .controller('SearchPersonController', SearchPersonController);

    /* @ngInject */
    function SearchPersonController($scope, $http, $routeParams, dataservice, logger) {
        /*jshint validthis: true */

        console.log('hello from SearchPersonController');
        var vm = this;

    }
})();
