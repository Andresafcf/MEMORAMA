/*!
    * Start Bootstrap - Creative v6.0.1 (https://startbootstrap.com/themes/creative)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-creative/blob/master/LICENSE)
    */
   
    (function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 75
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-scrolled");
    } else {
      $("#mainNav").removeClass("navbar-scrolled");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

 // Magnific popup calls
 $('#portfolio').magnificPopup({
  delegate: 'a',
  type: 'image',
  tLoading: 'Loading image #%curr%...',
  mainClass: 'mfp-img-mobile',
  gallery: {
    enabled: true,
    navigateByImgClick: true,
    preload: [0, 1]
  },
  image: {
    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
  }
});













  $(document).ready(function(){
	
    var checkArray = []; // para verificar si las dos cartas con click son el mismo personaje
    var idArray = []; //array para guardar los ids de las cartas que tienen click 
    var contador = 0;
    var fin = 0; 
    var fields = document.querySelectorAll(".atras");
    
    
    var images = [
    "assets/img/ventilador.jpg",
    "assets/img/memoria_ram.jpg",
    "assets/img/tarjeta_madre.jpg",
    "assets/img/tarjeta_de_sonido.jpg",
    "assets/img/tarjeta_de_video.jpg",
    "assets/img/tarjeta_de_red.jpg",
    "assets/img/ubuntu.jpg",
    "assets/img/kali_linux.jpg",
    "assets/img/ventilador.jpg",
    "assets/img/memoria_ram.jpg",
    "assets/img/tarjeta_madre.jpg",
    "assets/img/tarjeta_de_sonido.jpg",
    "assets/img/tarjeta_de_video.jpg",
    "assets/img/tarjeta_de_red.jpg",
    "assets/img/ubuntu.jpg",
    "assets/img/kali_linux.jpg"
    ];

    // verificacion de los clicks
    function clicked() { 
      if ($(this).find(".inner-wrap").hasClass("flipped")) {
        return;
      }
      $(this).find(".inner-wrap").toggleClass("flipped");
      checkArray.push($(this).find("img").attr("src"));
      idArray.push($(this).attr("id"));
      check();
    }
    
    $(".carta").on("click", clicked);
      
    //reiniciar el juego
    function reiniciar() {
      $(".atras").find("img").remove(); //quitar todas las imagenes actuales
      $(".carta .inner-wrap").removeClass("flipped"); // quitar la classe flipped para volver a su estado inicial
      checkArray = []; 
      idArray = [];
      contador = 0; 
      fin = 0;
      iniciarJuego();
    }
    //para verificar el fin del juego
    function verificarFin() {
      if (fin === 16) { //si todas las cartas estan volteadas
        Swal.fire({
          title: 'Felicidades, ganaste',
          text: 'numero de intentos: '+contador+'',
          icon: 'success',
          confirmButtonText: 'reiniciar'
        })
        //alert("Juego finalizado, lo has logrado en " + contador + " intentos");
        reiniciar();
      }
    }
    //para random de las imagenes 
    function shuffleArray(array) { 
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    
    function iniciarJuego() {
    
      
    
      var arr = shuffleArray(images); //array con las imagenes de forma aleatoria
     // append de las imagenes a la clase para la parte de atras de las cartas
      for (var i = 0; i < fields.length; i++) {
        var img = document.createElement("img");
        img.src = arr[i];
        fields[i].appendChild(img);
      }
    
    
    }
    
    function check() {
      //si los fields se  han hecho dos clicks 
      if (checkArray.length === 2) {
        $(".carta").off("click", clicked); 
        setTimeout(function(){
          //si no hay match
          if (checkArray[0] !== checkArray[1]) { 
            //voltear las dos cartas seleccionadas
            $("#" + idArray[0]).find(".inner-wrap").removeClass("flipped"); 
            $("#" + idArray[1]).find(".inner-wrap").removeClass("flipped"); 
            contador++;
            //vaciar los arrays para la siguiente eleccion
            checkArray = []; 
            idArray = []; 
            //habilitar el click de nuevo
            $(".carta").on("click", clicked);
          } else {
          
            contador++;
            
            fin += 2; // contador para el final del juego, se agregan dos para el contador de fin
            //vaciar los dos arrays
            checkArray = []; 
            idArray = []; 
            verificarFin(); 
            $(".carta").on("click", clicked); 
          }
          document.querySelector(".counter").innerHTML = contador;
        }, 800);	
      }
    }
    
    
    
    iniciarJuego();
    
    });


  
})(jQuery); // End of use strict
