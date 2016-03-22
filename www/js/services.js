angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('PokemonService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var pokemons = [
    { id: 0, name: 'Cats', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
    { id: 1, name: 'Dogs', description: 'Lovable. Loyal almost to a fault. Smarter than they let on.' },
    { id: 2, name: 'Turtles', description: 'Everyone likes turtles.' },
    { id: 3, name: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' }
  ];

  return {
    get: function(pokemonId) {
      // Simple index lookup
      return pokemons[pokemonId];
    }
  }
});
