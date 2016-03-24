var appModule = angular.module('starter.controllers', []);

// A simple controller that fetches a list of data from a service
appModule.controller('PokemonIndexCtrl', function($scope, $http) {
    $scope.baseUrlGetPokemons = "http://pokeapi.co/api/v2/pokemon?limit=30";
    
    $scope.pokemons = [];
    
    $scope.currentCount = {};
    
    $scope.nextPageUrl = {};
    $scope.nextPageExists = true;
  
    $scope.getPokemons = function () {
        console.log("GetPokemons called");
        
        $scope.addPokemonsByUrl($scope.baseUrlGetPokemons);
    }
    
    $scope.nextPage = function() {
        console.log("Next page called");
        
        $scope.addPokemonsByUrl($scope.nextPageUrl);
        
        // Disable recalling this method when last item was reached
        if($scope.nextPageUrl == null) {
            $scope.nextPageExists = false;
        }
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
            // Reload infinite scroll
            $scope.$broadcast('scroll.infiniteScrollComplete');
            
        // For JSON responses, resp.data contains the result
        }, function (err) {
            console.log("Failed: GetPokemons: " + err);
        });
    }
    
    $scope.setAndGetLocalStorage = function() {
        window.localStorage.setItem("username", "Max Mommersteeg");
    }
    
   // Load initial pokemons
   $scope.getPokemons();
   
   $scope.setAndGetLocalStorage();
   
});

appModule.controller('MyPokemonCtrl', function($scope, $stateParams, $http) {
    $scope.currentPosition = {};
    
    $scope.getCurrentPosition = function() {
        
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        function onSuccess(position) {
            console.log("Success: getCurrentPosition");
            $scope.currentPosition = position;
            
        }
        
        function onError() {
            console.log("Failed: getCurrentPosition");
            $scope.currentPosition = null;
        }
    }
    
    $scope.getCurrentPosition();  
});

appModule.controller('PokemonDetailCtrl', function($scope, $stateParams, $http) {
    $scope.baseUrlGetPokemon = "http://pokeapi.co/api/v2/pokemon/";
     
    $scope.pokemon = {};
     
    $scope.getPokemons = function (pokemonId) {
        // Assemble base url and Id
        var url = $scope.baseUrlGetPokemon + String(pokemonId);
        $http.get(url).then(function (resp) {
            console.log("Success: GetPokemon: " + url);
            // Set pokemon
            $scope.pokemon = resp.data;
            $scope.pokemon.ls = window.localStorage.getItem("username");
        }, function (err) {
            console.error("Pokemon retrieval failed: ", err.status);
                alert(err.status);
                // Alert user with error status
        });
    }
    
    //Call get pokemon
    $scope.getPokemons($stateParams.pokemonId);
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
