(function() {
  var maindiv = document.getElementById('akvaario');
  var total = 20;

  function createShroom(size) {
    var shroom = document.createElement('img');
    shroom.src = 'sieni.svg';
    shroom.width = shroom.height = size;
    maindiv.appendChild(shroom);
  }

  for(var i = 0; i < total; i++) {
    createShroom(64);
  }
  createShroom(256);

})();
