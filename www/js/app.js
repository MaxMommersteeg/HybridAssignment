// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('pokedex', ['ionic'])

  .controller('HomeCtrl', function($scope, $ionicModal) {
    // Test data
    $scope.pokemons = [
      { name: 'Charizard' },
      { name: 'Mewtwo' },
      { name: 'Blastoise' },
      { name: 'Mew' },
      { name: 'Lugia' },
      { name: 'Arcanine' },
      { name: 'Dragonite' },
      { name: 'Rayquaza' },
      { name: 'Typhlosion' }
    ];

    //// No need for testing data anymore
    //$scope.pokemons = [];

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('new-pokemon.html', function(modal) {
      $scope.pokemonModal = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });

    // Called when the form is submitted
    $scope.createPokemon = function(pokemon) {
      $scope.pokemons.push({
        name: pokemon.name
      });
      $scope.pokemonModal.hide();
      pokemon.name = "";
    };

    // Open our new pokemon modal
    $scope.newPokemon = function() {
      $scope.pokemonModal.show();
    };

    // Close the new pokemon modal
    $scope.closeNewPokemon = function() {
      $scope.pokemonModal.hide();
    };
  })

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
});
