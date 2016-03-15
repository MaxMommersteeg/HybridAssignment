
 angular.module('pokedex', ['ionic']).controller('HomeController', function($scope, $http) {
     
    // All pokemons
    $scope.pokemons = [];
    // Current selected pokemon
    $scope.currentPokemon = {};
     
    $http.get('http://pokeapi.co/api/v2/pokemon').then(function (resp) {
        alert(resp.data.results);
        console.log('Success', resp.data.results);
        for (i = 0; i < resp.data.results.length; i++) {
            $scope.pokemons.push({
                name: resp.data.results[i].name,
                url: resp.data.results[i].url
            });
        }
        // For JSON responses, resp.data contains the result
    }, function (err) {
      console.error('Error status:', err.status);
      alert(err.status);
      // err.status will contain the status code
    });

    // Called when the form is submitted
    $scope.createPokemon = function (pokemon) {
      $scope.pokemons.push({
        name: pokemon.name,
        url: pokemon.url
      });

      pokemon.name = "";
      pokemon.url = "";
    };
    
    $scope.showPokemon = function (url) {
        $scope.currentPokemon = {};
    };
});
