(function() {
  var maindiv = document.getElementById('akvaario');
  var sizes = [16,32,64,128,256];
  var maxCount = 25;

  function pickRandom(arr) {
    var i = Math.floor(Math.random()*arr.length);
    return arr.splice(i, 1)[0];
  }
  function createShroom(size) {
    var shroom = document.createElement('img');
    shroom.src = 'sieni.svg';
    shroom.width = shroom.height = size;
    maindiv.appendChild(shroom);
  }

  for(var s = 0; s < 3; s++) {
    var size = pickRandom(sizes);
    var count = Math.ceil((maxCount - (Math.log2(size)*3)) * (Math.random()+0.5));
    console.log(size + " -> " + count);
    for(var i = 0; i < count; i++) {
      createShroom(size);
    }

  }

})();
