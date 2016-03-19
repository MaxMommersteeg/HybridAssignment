angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('PokemonIndexCtrl', function($scope, PokemonService) {
  // "Pets" is a service returning mock data (services.js)
  console.log("Controller called");
  $scope.pokemons = PokemonService.all();
})


// A simple controller that shows a tapped item's data
.controller('PokemonDetailCtrl', function($scope, $stateParams, PokemonService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pokemon = PokemonService.get($stateParams.petId);
});
