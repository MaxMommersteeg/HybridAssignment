
 angular.module('pokedex', ['ionic']).controller('HomeController', function($scope, $http) {
    
    // Current amount of pokemons in $scope.pokemons
    $scope.currentCount = {}; 
    // Url for next page of pokemons
    $scope.nextPageUrl = {}; 
    // Url for previous page of pokemons 
    $scope.previousPageUrl = {};
    // Pokemons on current page
    $scope.pokemons = [];
    
    // Current selected pokemon
    $scope.currentPokemon = {};
        
    // Get initial pokemons   
    $http.get('http://pokeapi.co/api/v2/pokemon?limit=10').then(function (resp) {
            console.log('Success: initial GetPokemons', resp.data.results);
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
            console.error('Error status:', err.status);
            alert(err.status);
            // Alert user with error status
        });
      
    // Function for requesting pokemons by given parameter url
    $scope.getPokemons = function (url, deletecurrent) {
        $http.get(url).then(function (resp) {
            console.log('Success: GetPokemons', resp.data.results);
            // Set Global variables for this API call
            $scope.currentCount = resp.data.count;
            $scope.nextPageUrl = resp.data.next;
            $scope.previousPageUrl = resp.data.previous;
            
            // Perhaps make a different method e.g.: getPokemons and addPokemons
            if(deletecurrent === true) {
                // Empty existing pokemons array
                deletePokemons();
                
                console.log("Prevous pokemons are deleted from the array");
            }
            
            // Iterate over retrieved pokemons from API call
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
            // Alert user with error status
        });
    };

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
        console.log("Retrieving: " + url);
        // Retrieve pokemon by url
        $http.get(url).then(function (resp) {
            console.log('Success: showPokemon', resp.data);
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
    
    // Reload pokemons variable with pokemons on next page
    $scope.nextPokemonPage = function () {
        if($scope.nextPageUrl == null) {
            console.log("Next Page url is null");
            return;
        }
        console.log("Success: nextPokemonPage");
        // Reload pokemons with next
        $scope.getPokemons($scope.nextPageUrl, true);
    }
    
    // Reload pokemons variable with pokemons on previous page
    $scope.previousPokemonPage = function() {
        if($scope.previousPageUrl == null) {
            console.log("Previous Page url is null");
            return;
        }
        console.log("Success: previousPokemonPage");
        // Reload pokemons with previous
        $scope.getPokemons($scope.previousPageUrl, true);
    }
    
    // Private functions / methods
    
    
    function deletePokemons() {
        $scope.pokemons = [];
    }
});
