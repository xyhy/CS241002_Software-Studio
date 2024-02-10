function enter(){
    move();
    setTimeout(function(){window.location.href = "menu.html";}, 2000);
    
}

function move() {
    var elem = document.getElementById("loading-bar");   
    var width = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++; 
        elem.style.width = width + '%'; 
        elem.innerHTML = width * 1  + '%';
      }
    }
}