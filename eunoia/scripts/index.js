var nav = document.getElementById('nav');

function scrollTo(element) {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.offsetTop
    });
  }

  
document.getElementById("changes-button").addEventListener('click', (e) => {
    scrollTo(document.getElementById("changes"));
  });



function responsive() {
    var x = document.getElementById("nav");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}

function showContent(n){
    content1 = document.getElementById("women-1");
    content2 = document.getElementById("women-2");
    content3 = document.getElementById("women-3");
    content1.style.display = "none";
    content2.style.display = "none";
    content3.style.display = "none";
    var display = "block";
    if(window.screen.width > 800){
      display = "grid"
    }
    if(n == 1){
        content1.style.display = display;
    }else if(n == 2){
        content2.style.display = display;
    }else{
        content3.style.display = display;
    }
}

var modal = document.getElementById("thank-you");

var btn = document.getElementById("join-button");

var span = document.getElementById("close-button");
btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}