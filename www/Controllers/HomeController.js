
 angular.module('pokedex', ['ionic']).controller('HomeController', function($scope, $http) {
     
    $scope.pokemons = [];
     
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
