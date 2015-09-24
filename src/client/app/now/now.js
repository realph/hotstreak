(function() {
    'use strict';

    angular
        .module('app.now')
        .controller('NowPlayingMovieListController', NowPlayingMovieListController);

    /* @ngInject */
    function NowPlayingMovieListController($scope, $http, $routeParams, $location, dataservice, logger) {
        /*jshint validthis: true */

        console.log('hello from NowPlayingMovieListController');
        var vm = this;
        var apiKey = 'cbb41436977f2a2dd66688a5b0daa67e';

        var actorId = vm.actorId;
        vm.movieList = [];

        $scope.searchPerson = function(name) { // should be vm.searchPerson, why doesn't that work
          var query = name.replace('-', ' ').split(' ').join('+').toLowerCase();
          console.log('this search thing works and the name is ' + query);
          $location.path('/now/' + query);
        }

        // var str = 'tom hanks';
        // var str = '';
        // var str = vm.personName;
        // console.log('personName', vm.personName);
        // var name = str.split(' ').join('+').toLowerCase();

        var urlName = $routeParams.person;
        var name = urlName.split('-').join('+');
        console.log(name);

        activate();

        function activate() {
            return getFilms().then(function() {
              logger.info('Activated Person Movie List View');
            });
        }

        function getFilms() {
            return dataservice.getPersonId(name).then(function(response) {
              dataservice.getFilms(response).then(function(data) {
                  vm.movieList = data;
                  return vm.movieList;
              });
            });
        }
    }
})();
