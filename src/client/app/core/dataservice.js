(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger) {
        var isPrimed = false;
        var primePromise;
        var apiKey = 'cbb41436977f2a2dd66688a5b0daa67e';

        var service = {
            getAvengersCast: getAvengersCast,
            getAvengerCount: getAvengerCount,
            getAvengers: getAvengers,
            getPersonId: getPersonId,
            getFilms: getFilms,
            ready: ready
        };

        return service;

        function getFilms(p) {
          var q = 'http://api.themoviedb.org/3/discover/movie?with_cast=' + p + '&sort_by=vote_average.desc&api_key=' + apiKey;
          console.log('query is', q);
          return $http.get(q)
            .then(function (response) {
              var data = response.data;
              if (response.status == 200) {
                return data.results;
              }
            }, function (error) {
              console.log('Error happened whilst getting the actor or actress.');
              return 'Error occured.'
            })
        }

        function getPersonId(n) {
          var q = 'http://api.themoviedb.org/3/search/person?api_key=' + apiKey + '&query=' + n;
          var id = 0;
          return $http.get(q)
            .then(function (response) {
              var data = response.data;
              if (response.status == 200) {
                var person = data.results[0];
                var id = person.id;
                return id;
              }
            }, function (error) {
              console.log('Error happened whilst getting the actor or actress');
              return 'Error occured.'
            })
        }

        function getAvengers() {
            return $http.get('/api/maa')
                .then(getAvengersComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAvengers')(message);
                    $location.url('/');
                });

            function getAvengersComplete(data, status, headers, config) {
                return data.data[0].data.results;
            }
        }

        function getAvengerCount() {
            var count = 0;
            return getAvengersCast()
                .then(getAvengersCastComplete)
                .catch(exception.catcher('XHR Failed for getAvengerCount'));

            function getAvengersCastComplete (data) {
                count = data.length;
                return $q.when(count);
            }
        }

        function getAvengersCast() {
            var cast = [
                {name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man'},
                {name: 'Chris Hemsworth', character: 'Thor'},
                {name: 'Chris Evans', character: 'Steve Rogers / Captain America'},
                {name: 'Mark Ruffalo', character: 'Bruce Banner / The Hulk'},
                {name: 'Scarlett Johansson', character: 'Natasha Romanoff / Black Widow'},
                {name: 'Jeremy Renner', character: 'Clint Barton / Hawkeye'},
                {name: 'Gwyneth Paltrow', character: 'Pepper Potts'},
                {name: 'Samuel L. Jackson', character: 'Nick Fury'},
                {name: 'Paul Bettany', character: 'Jarvis'},
                {name: 'Tom Hiddleston', character: 'Loki'},
                {name: 'Clark Gregg', character: 'Agent Phil Coulson'}
            ];
            return $q.when(cast);
        }

        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                logger.info('Primed data');
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }

    }
})();
