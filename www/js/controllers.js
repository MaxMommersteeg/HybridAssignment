var appModule = angular.module('starter.controllers', []);

// A simple controller that fetches a list of data from a service
appModule.controller('PokemonIndexCtrl', function($scope, $http) {
    $scope.baseUrlGetPokemons = "http://pokeapi.co/api/v2/pokemon?limit=10";
    
    $scope.pokemons = [];
    
    $scope.currentCount = {};
    $scope.nextPageUrl = {};
    $scope.previousPageUrl = {};
  
    $scope.getPokemons = function () {
        console.log("GetPokemons called");
        $scope.addPokemonsByUrl($scope.baseUrlGetPokemons);
    }
    
    $scope.nextPage = function() {
        console.log("Next page called");
        if($scope.nextPage == null) {
            console.log("Next page url is null");
            return;
        }
        $scope.addPokemonsByUrl($scope.nextPageUrl);
        $scope.$broadcast('scroll.infiniteScrollComplete');
    }
    
    $scope.addPokemonsByUrl = function(url) {
        $http.get(url).then(function (resp) {        
            console.log("Success: GetPokemons: " + url);
            //Set Global variables for this API call
            $scope.currentCount = resp.data.count;
            $scope.nextPageUrl = resp.data.next;
            $scope.previousPageUrl = resp.data.previous;
            
            // Iterate over retrieved pokemons from API call
            for (i = 0; i < resp.data.results.length; i++) {
                //Remove last slash from url, get PokemonId by url
                var urlWithoutTrailingSlash = stripTrailingSlash(resp.data.results[i].url);
                var id = urlWithoutTrailingSlash.split('/').pop();
                $scope.pokemons.push({pokemonId:id, name:resp.data.results[i].name, url: resp.data.results[i].url});
            }
        // For JSON responses, resp.data contains the result
        }, function (err) {
            console.error("Failed: GetPokemons: ", err.status);
            alert(err.status);
            // Alert user with error status
        });
    }
   
   // Load initial pokemons
   $scope.getPokemons();
});

appModule.controller('PokemonDetailCtrl', function($scope, $stateParams, $http) {
    $scope.baseUrlGetPokemon = "http://pokeapi.co/api/v2/pokemon/";
     
    // Logging
    console.log("Pokemon detail controller called");
    
    $scope.pokemon = {};
    
    //Call get pokemon
    getPokemon($stateParams.pokemonId);
    
    function getPokemon(pokemonId) {
        // Assemble base url and Id
        var url = $scope.baseUrlGetPokemon + String(pokemonId);
        $http.get(url).then(function (resp) {
            console.log("Success: GetPokemon: " + url);
            // Set pokemon
            $scope.pokemon = resp.data;
            
        }, function (err) {
            console.error("Pokemon retrieval failed: ", err.status);
                alert(err.status);
                // Alert user with error status
        });
    }
});

function stripTrailingSlash(str) {
    return str.replace(/\/$/, "");
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    url = url.toLowerCase(); // This is just to avoid case sensitiveness  
    name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// This is just to avoid case sensitiveness for query parameter name
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
