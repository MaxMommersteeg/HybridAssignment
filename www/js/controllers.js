var appModule = angular.module('starter.controllers', []);

// A simple controller that fetches a list of data from a service
appModule.controller('PokemonIndexCtrl', function($scope, $http) {
  $scope.baseUrlGetPokemons = "http://pokeapi.co/api/v2/pokemon?limit=10";
  
  $scope.pokemons = [];
  
  loadPokemons();
  
  function loadPokemons() {
      $http.get($scope.baseUrlGetPokemons).then(function (resp) {
            console.log("Success: GetPokemons", resp.data.results);
            //Set Global variables for this API call
            $scope.currentCount = resp.data.count;
            $scope.nextPageUrl = resp.data.next;
            $scope.previousPageUrl = resp.data.previous;
            
            // Iterate over retrieved pokemons from API call
            for (i = 0; i < resp.data.results.length; i++) {
                $scope.pokemons.push({
                    name: resp.data.results[i].name,
                    url: resp.data.results[i].url
                });
            }
        // For JSON responses, resp.data contains the result
        }, function (err) {
            console.error("Failed: GetPokemons: ", err.status);
            alert(err.status);
            // Alert user with error status
        });
    }
});

appModule.controller('PokemonDetailCtrl', function($scope, $http, $stateParams) { 
    $scope.pokemon = {};
    
    // Logging
    console.log("Pokemon detail controller called");
    
    //Call get pokemon
    getPokemon($stateParams.url);
    
    function getPokemon(url) {
      $http.get(url).then(function (resp) {
          console.log("Success: GetPokemon", resp.data.results);
          
          // Set pokemon
          $scope.pokemon = resp.data;
          
      }, function (err) {
          console.error("Pokemon retrieval failed: ", err.status);
            alert(err.status);
            // Alert user with error status
      });
    }
});
