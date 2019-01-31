var charmeleon={name:'Charmeleon', height:110, type: 'fire', abilities:['blaze', 'solar-power']};
var pikachu={name: 'Pikachu', height:40, type:'electric', abilities:['Static', 'Lightningrod']};
var psyduck={name: 'Psyduck', height:80, type:'water', abilities:['Damp', 'Cloud-nine', 'Swift-swim']};

var repository=[charmeleon, pikachu, psyduck];
for (var i = 0; i < repository.length; i++) {
  if (repository[i].height>90) {
    var nameHeight=repository[i].name + ' - height: ' + repository[i].height + ' cm. Wow, that\'s big!'
  } else {
    var nameHeight=repository[i].name + ' - height: ' + repository[i].height + ' cm.'
  }
  if (repository[i].type==='fire'){
    document.write('<div class="fire">'+ nameHeight + '</div>')
  } else if (repository[i].type==='electric'){
    document.write('<div class="electric">'+ nameHeight + '</div>')
  } else if (repository[i].type==='water'){
    document.write('<div class="water">'+ nameHeight + '</div>')
  }else{
    document.write('<div class="pokemon">'+ nameHeight + '</div>')
  }
}
