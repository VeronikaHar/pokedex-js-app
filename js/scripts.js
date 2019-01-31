var charmeleon={name:'Charmeleon', height:110, abilities:['blaze', 'solar-power']};
var pikachu={name: 'Pikachu', height:40, abilities:['Static', 'Lightningrod']};
var psyduck={name: 'Psyduck', height:80, abilities:['Damp', 'Cloud-nine', 'Swift-swim']};

var repository=[charmeleon, pikachu, psyduck];
for (var i = 0; i < repository.length; i++) {
  if (repository[i].height>90) {
    document.write('<div class=pokemon>' +repository[i].name + ' - height: ' + repository[i].height + ' cm. Wow, that\'s big! </div>')
  } else {
    document.write('<div class=pokemon>' +repository[i].name + ' - height: ' + repository[i].height + ' cm.</div>')
  }
}
