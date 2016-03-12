// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('pokedex', ['ionic'])

  .factory('Types', function() {
    return {
      all: function() {
        var typeString = window.localStorage['types'];
        if(typeString) {
          return angular.fromJson(typeString);
        }
        return [];
      },
      save: function(types) {
        window.localStorage['types'] = angular.toJson(types);
      },
      newType: function(typeName) {
        //Add new type
        return {
          name: typeName,
          pokemons: []
        };
      },
      getLastActiveIndex: function() {
        return parseInt(window.localStorage['lastActiveType']) || 0;
      },
      setLastActiveIndex: function(index) {
        window.localStorage['lastActiveType'] = index;
      }
    }
  })

  .controller('HomeCtrl', function($scope, $timeout, $ionicModal, Types, $ionicSideMenuDelegate) {

    // Utility for creating a new type
    var createType = function(typeName) {
      var newType = Types.newType(typeName);
      $scope.types.push(newType);
      Types.save($scope.types);
      $scope.selectType(newType, $scope.types.length-1);
    };

    // Load or initalize types
    $scope.types = Types.all();

    // Grab the last active, or the first type
    $scope.activeType = $scope.types[Types.getLastActiveIndex()];

    // Called to create a new type
    $scope.newType = function() {
      var typeTitle = prompt('Type name');
      if(typeTitle) {
        createType(typeTitle);
      }
    };

    // Called to select the given type
    $scope.selectType = function(type, index) {
      $scope.activeType = type;
      Types.setLastActiveIndex(index);
      $ionicSideMenuDelegate.toggleLeft(false);
    };

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
      scope: $scope
    });

    // Called when the form is submitted
    $scope.createPokemon = function(pokemon) {
      if(!$scope.activeType || !pokemon) {
        return;
      }
      $scope.activeType.pokemons.push({
        name: pokemon.name
      });
      $scope.pokemonModal.hide();

      // Inefficient..
      Types.save($scope.types);

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

    $scope.toggleTypes = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

    // Try to create the first type, do this by creating a timeout so that everything is getting created
    $timeout(function () {
      if($scope.types.length == 0) {
        while(true) {
          var typeName = "Testtype";
          if(typeName) {
            createType(typeName);
            break;
          }
        }
      }
    });
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
