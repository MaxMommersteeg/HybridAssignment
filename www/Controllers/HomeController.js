
 angular.module('pokedex', ['ionic']).controller('HomeController', function($scope, $http) {
     
    // All pokemons
    $scope.pokemons = [];
    // Current selected pokemon
    $scope.currentPokemon = {};
     
    $http.get('http://pokeapi.co/api/v2/pokemon').then(function (resp) {
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
      //Alert user with error status
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
        // Retrieve pokemon by url
        $http.get(url).then(function (resp) {
            // Set currentPokemon to be the retrieved JSON object of type Pokemon
            $scope.currentPokemon = resp.data;
            
            // Show pokemon name and some data for testing purposes
            alert("id: " + $scope.currentPokemon.id + " | name: " +  $scope.currentPokemon.name + " | weight: " + $scope.currentPokemon.weight);
            
        }, function(err) {
            console.error('Error status:', err.status);
            alert(err.status);
            // Alert user with error status
        });
        
    };
});
