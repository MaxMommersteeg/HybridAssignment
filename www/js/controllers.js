var appModule = angular.module('starter.controllers', []);

// PokemonIndex Controller
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
                $scope.pokemons.push({name:resp.data.results[i].name, url: resp.data.results[i].url});
            }
            // Reload infinite scroll
            $scope.$broadcast('scroll.infiniteScrollComplete');
            
        // For JSON responses, resp.data contains the result
        }, function (err) {
            console.error("Failed: GetPokemons");
            console.error(err);
        });
    }
    $scope.setAndGetLocalStorage = function() {
        window.localStorage.setItem("username", "Max Mommersteeg");
    }
   // Load initial pokemons
   $scope.getPokemons();
   $scope.setAndGetLocalStorage();
});

// MyPokemon Controller
appModule.controller('MyPokemonCtrl', function($scope, $stateParams, $http) {
    $scope.currentPosition = {};
    
    $scope.getCurrentPosition = function() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        function onSuccess(position) {
            console.log("Success: getCurrentPosition");
            $scope.currentPosition = position;
            
        }  
        function onError() {
            console.error("Failed: getCurrentPosition");
            $scope.currentPosition = null;
        }
    }
    $scope.getCurrentPosition();  
});

// PokemonDetail Controller
appModule.controller('PokemonDetailCtrl', function($scope, $stateParams, $http) {
    $scope.baseUrlGetPokemon = "http://pokeapi.co/api/v2/pokemon/";
    $scope.pokemon = {};
    
    $scope.getPokemon = function (name) {
        // Assemble base url and Id (name)
        var url = $scope.baseUrlGetPokemon + String(name);
        $http.get(url).then(function (resp) {
            console.log("Success: GetPokemon: " + url);
            // Set pokemon
            $scope.pokemon = resp.data;
            $scope.pokemon.ls = window.localStorage.getItem("username");
        }, function (err) {
            console.error("Failed: getPokemons: ", err.status);
            console.error(err);
        });
    }
    //Call get pokemon
    $scope.getPokemon($stateParams.name);
});

appModule.controller('SettingsCtrl', function($scope, $http) {});
