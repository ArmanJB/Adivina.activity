$(function(){  

  var conjunto = palabras();//palabras.js
  
  var palabra = conjunto[Math.floor(Math.random()*conjunto.length)];
  var utilizadas = [];

  var contador = 0;
  var contadorGanar = 0;

  for (var i = 0; i<palabra.length; i++) {
    var juego = $("<p></p>").text(" ____ ").attr("id", "letra"+i).addClass("letras");
    $("#palabra").append(juego);
  };

  $("#buttonAgregar").on("click", function(){
    if ( $("#intento").val().length == 1 ) {
      if (agregarUtilizada($("#intento").val()) ) {
        buscar( $("#intento").val() );
      };
      $("#intento").val("");
    }else if( $("#intento").val().length == 0){
      $("#textError").html("Escribe una letra");
      $("#textError").fadeIn(1000).fadeOut(1000);
    }else{
      $("#textError").html("Escribe solo una letra a la vez!!");
      $("#textError").fadeIn(1000).fadeOut(1000);
    };
  });

  function agregarUtilizada(letra){
    var encontrada = false;
    for (var i = 0; i<utilizadas.length; i++) {
      if (utilizadas[i]==letra) {
        encontrada = true;
        break;
      };
    };
    if (encontrada == false) {
      utilizadas.push(letra);
      var nuevaLetra = $("<p></p>").text(letra+", ").attr("id", letra).addClass("letras");
      $("#utilizadas").append(nuevaLetra);
      return true;
    }else{
      $("#"+letra).addClass("again")
      $("#"+letra).fadeOut(1000).fadeIn(1000);
      setTimeout(function(){$("#"+letra).removeClass("again");},2500);
      return false;
    };
  }

  function buscar(letra){
    var resp = false;
    for (var i = 0; i < palabra.length; i++) {
      if (letra == palabra[i]) {
        $("#letra"+i).html(letra).addClass("letrasEncontradas");
        contadorGanar++;
        resp = true;
      };
    };
    if (resp == false) {
      contador++;
      $("#textError").html("Te equivocaste, tienes "+(10-contador)+" intentos todavía.");
      $("#textError").fadeIn(1000).fadeOut(1000);
    };
    finalizar();
  }

  function finalizar(){
    if (contador==10){
      for (var i = 0; i<palabra.length; i++) {
        $("#letra"+i).html(palabra[i]).addClass("letrasEncontradas again");
      };
      $("#textError").html("Has perdido!!");
      $("#textError").fadeIn(1000).fadeOut(1000);
      setTimeout(function(){location.reload();}, 2000);
    };
    if (contadorGanar==palabra.length){
      $("#textError").html("HAS GANADO!!");
      $("#textError").fadeIn(1000).fadeOut(1000);
      setTimeout(function(){location.reload();}, 2000);
    };
  }


});

