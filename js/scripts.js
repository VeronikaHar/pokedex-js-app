var pokemonRepository = (function(){
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Function that collects pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  //Function that adds a new button with pokemon name to DOM
  function addListItem(pokemon) {

    //Shaping DOM structure
    var $liEl = document.createElement('li');
    var $buttonEl = document.createElement('button');
    $buttonEl.classList.add('pokemon');
    $buttonEl.innerText=pokemon.name;
    $liEl.appendChild($buttonEl);

    var $ul = document.querySelector('ul');
    $ul.appendChild($liEl);

    // Event listener that dispalys Pokemon details upon clicking on chosen pokemon
    $buttonEl.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

//Function that accepts pokemon object and adds it to repository
  function add(pokemon) {
    if (typeof pokemon === 'object' && typeof pokemon.name === 'string') {
    repository.push(pokemon);
    } else {
      prompt('Please enter a valid pokemon object!');
    };
  }

  function getAll() {
    return repository;
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (pokemon) {
        var pokemon = {
          name: pokemon.name,
          detailsUrl: pokemon.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(pokemon) {
    var url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the pokemon item
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = [];
      for (i = 0; i < details.types.length; i++) {
        pokemon.types.push(details.types[i].type.name);
      };
      pokemon.abilities = [];
      for (i = 0; i < details.abilities.length; i++) {
        pokemon.abilities.push(details.abilities[i].ability.name);
      };
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    addListItem: addListItem,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
}) ();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
