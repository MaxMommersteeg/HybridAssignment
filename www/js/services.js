angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('PokemonService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var pokemons = [
    { id: 0, name: 'Cats', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
    { id: 1, name: 'Dogs', description: 'Lovable. Loyal almost to a fault. Smarter than they let on.' },
    { id: 2, name: 'Turtles', description: 'Everyone likes turtles.' },
    { id: 3, name: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' }
  ];

  return {
    all: function() {
      $http.get('http://pokeapi.co/api/v2/pokemon?limit=10').then(function (resp) {
            console.log('Success: initial GetPokemons', resp.data.results);
            //Set Global variables for this API call
            $scope.currentCount = resp.data.count;
            $scope.nextPageUrl = resp.data.next;
            $scope.previousPageUrl = resp.data.previous;
            
            var pokemons = [];
            
            // Iterate over retrieved pokemons from API call
            for (i = 0; i < resp.data.results.length; i++) {
                pokemons.push({
                    name: resp.data.results[i].name,
                    url: resp.data.results[i].url
                });
            }
        // For JSON responses, resp.data contains the result
        }, function (err) {
            console.error('Error status:', err.status);
            alert(err.status);
            // Alert user with error status
        });
        return pokemons;
    },
    get: function(pokemonId) {
      // Simple index lookup
      return pokemons[pokemonId];
    }
  }
});
