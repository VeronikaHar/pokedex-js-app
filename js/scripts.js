var pokemonRepository = (() => {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  // Function that collects pokemon details
  function showDetails(pokemon) {
    (() => {
      var $modalContainer=document.querySelector('#modal-container');
      
      function showModal(title, text){
        // Clear all existing modal content
        $modalContainer.innerHTML = '';
        
        var modal=document.createElement('div');
        modal.classList.add('modal');
        
        //Add new modal content
        var titleElement=document.createElement('h2');
        titleElement.innerText=title;
        
        var imgElement=document.createElement('img');
        imgElement.setAttribute('src', pokemon.imageUrl)

        var contentElement=document.createElement('p');
        contentElement.innerText=text;
        
        var closeButtonElement= document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText= 'Back to Pokedex';
        closeButtonElement.addEventListener('click', hideModal);
        
        modal.appendChild(titleElement);
        modal.appendChild(imgElement);
        modal.appendChild(contentElement);
        modal.appendChild(closeButtonElement);
        $modalContainer.appendChild(modal);
        $modalContainer.classList.add('is-visible');
      }
      
      function hideModal(){
        $modalContainer.classList.remove('is-visible');
      }

      var pokemonName=pokemon.name.charAt(0).toUpperCase().toUpperCase()+pokemon.name.slice(1);
      loadDetails(pokemon).then( () => {
        var pokemonDetails='Height: ' + pokemon.height/10 +' m' + '\nAbilities: ' + pokemon.abilities
        + '\nType: ' + pokemon.types;
        showModal(pokemonName, pokemonDetails);
      });
       
      
      
      //Close modal by pressing ESC on the keyboard
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
          hideModal();
        }
      });
      
      $modalContainer.addEventListener('click', (e) => {
        var target = e.target;
        if (target === $modalContainer) {
          hideModal();
        }
      });
    }) ();
  }
  
  
  //Function that adds a new button with pokemon name to DOM
  function addListItem(pokemon) {
    
    //Shaping DOM structure
    var $liEl = document.createElement('li');
    var $buttonEl = document.createElement('button');
    $buttonEl.classList.add('pokemon');
    $buttonEl.innerText=pokemon.name.charAt(0).toUpperCase().toUpperCase()+pokemon.name.slice(1);
    $liEl.appendChild($buttonEl);
    
    //Creating div for a modal with pokemon details
    var $modalEl=document.createElement('div');
    $modalEl.setAttribute('id','modal-container');
    $liEl.appendChild($modalEl);
    
    var $ul = document.querySelector('ul');
    $ul.appendChild($liEl);
    
    // Event listener that dispalys Pokemon details upon clicking on chosen pokemon
    $buttonEl.addEventListener('click', () => {
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
    return fetch(apiUrl).then( (response) => {
      return response.json();
    }).then( (json) => {
      json.results.forEach( (pokemon) => {
        var pokemon = {
          name: pokemon.name,
          detailsUrl: pokemon.url
        };
        add(pokemon);
      });
    }).catch( (e) => {
      console.error(e);
    })
  }
  
  function loadDetails(pokemon) {
    var url = pokemon.detailsUrl;
    return fetch(url).then( (response) => {
      return response.json();
    }).then( (details) => {
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
    }).catch( (e) => {
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

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});

function searchPoke() {
  // Declare variables
  var input, filter, ul, li, pokeButton, i, txtValue;
  input = document.querySelector('#pokeInput');
  filter = input.value.toUpperCase();
  ul = document.querySelector('ul');
  li = document.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    pokeButton = li[i].getElementsByClassName('pokemon')[0];
    txtValue = pokeButton.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}