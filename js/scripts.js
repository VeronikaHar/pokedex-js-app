var pokemonRepository = (function(){
var repository = [
    {name:'Charmeleon', height:1.1, type: 'fire', abilities:['blaze', 'solar-power']},
    {name: 'Pikachu', height:0.4, type:'electric', abilities:['Static', 'Lightningrod']},
    {name: 'Psyduck', height:0.8, type:'water', abilities:['Damp', 'Cloud-nine', 'Swift-swim']}
  ];

  function add (pokemon) {
    repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }

  return {
    add: add,
    getAll: getAll
  };
}) ();

Object.keys(pokemonRepository.getAll()).forEach(function(pokemon) {
  if (pokemonRepository.getAll()[pokemon].height>0.9) {
    var nameHeight=pokemonRepository.getAll()[pokemon].name + ' - height: ' + pokemonRepository.getAll()[pokemon].height + ' m. Wow, that\'s big!'
  } else {
    var nameHeight=pokemonRepository.getAll()[pokemon].name + ' - height: ' + pokemonRepository.getAll()[pokemon].height + ' m.'
  }
  if (pokemonRepository.getAll()[pokemon].type==='fire'){
    document.write('<div class="fire">'+ nameHeight + '</div>')
  } else if (pokemonRepository.getAll()[pokemon].type==='electric'){
    document.write('<div class="electric">'+ nameHeight + '</div>')
  } else if (pokemonRepository.getAll()[pokemon].type==='water'){
    document.write('<div class="water">'+ nameHeight + '</div>')
  } else {
    document.write('<div class="pokemon">'+ nameHeight + '</div>')
  }
});
