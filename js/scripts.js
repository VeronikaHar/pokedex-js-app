var pokemonRepository = (function(){
  var repository = [
    {name:'Charmeleon', height:1.1, type: 'fire', abilities:['blaze', 'solar-power']},
    {name: 'Pikachu', height:0.4, type:'electric', abilities:['Static', 'Lightningrod']},
    {name: 'Psyduck', height:0.8, type:'water', abilities:['Damp', 'Cloud-nine', 'Swift-swim']}
  ];

// Function that collects pokemon details
  function showDetails(pokemon){
    console.log(pokemon);
  };

//Function that adds a new pokemon object to DOM
  function addListItem (pokemon) {
    var pokeProperties = Object.keys(pokemon);
    var checkArray = ['name', 'height', 'type', 'abilities'];
    var validObject = pokeProperties.length === checkArray.length? true:false;

    checkArray.forEach(function(el) {
      if (pokeProperties.includes(el)){
        validObject = true;
      } else {
        validObject = false;
      }
    });

    if (validObject &&
        typeof pokemon === 'object' &&
        typeof pokemon.name === 'string' &&
        typeof pokemon.type === 'string' &&
        typeof pokemon.height === 'number' &&
        (typeof pokemon.abilities === 'string'||typeof pokemon.abilities === 'object')) {
      repository.push(pokemon);
    } else {
      prompt('Please enter a pokemon with valid name, height, type and abilities properties!');
    };

    //Shaping DOM structure
    var $liEl = document.createElement('li');
    var $buttonEl = document.createElement('button');
    $buttonEl.classList.add(pokemon.type);
    $buttonEl.innerText=pokemon.name;
    $liEl.appendChild($buttonEl);

    var $ul = document.querySelector('ul');
    $ul.appendChild($liEl);

    // Event listener that dispalys Pokemon details upon clicking on chosen pokemon
    $buttonEl.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  function getAll() {
    return repository;
  }

  return {
    addListItem: addListItem,
    getAll: getAll
  };
}) ();

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
