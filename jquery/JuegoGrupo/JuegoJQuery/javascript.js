  //------------------COMIENZO SCRIPT------------------
$(function() {

  var animals = ["img/cat.jpg", "img/horse.jpg", "img/kang.jpg", "img/carrion.jpg"]
  var random, randomUno, randomDos, randomTres, randomCuatro;
  random = randomUno = randomDos = randomTres = randomCuatro = Math.floor(Math.random() * (4 - 1 + 1));
  var nombre = $("#usu");
  var edad = $("#ed");
  var contador = -1;
  var fracasos = 0;
  $("#hachedos").html("Dale a un animal para comenzar");

  $("#btn").click(function(){
    if(edad.val() < 1){
      alert("La edad minima es de 1 año");
    }
    else if(nombre.val() == "" || edad.val() == ""){
      alert("Has dejado algun campo sin rellenar");
    }
    else if(Number.isInteger(edad.val()) == true){
      alert("La edad debe ser numerica");
    }
    else if($("#dificil").prop('checked')){
      document.getElementById('audif').play();
      $("#usuario").html(nombre.val());
      $("#inicio").animate({height: '0px'});
      $("#edad").html(edad.val());
    }
    else{
      document.getElementById('cancion').play();
      $("#usuario").html(nombre.val());
      $("#inicio").animate({height: '0px'});
      $("#edad").html(edad.val());
    }
  });

  function aleatorio(){
  while(randomUno === randomDos || randomDos === randomTres || randomTres === randomCuatro || randomUno === randomTres || randomDos === randomCuatro || randomUno === randomCuatro){
    var random = Math.floor(Math.random() * (4 - 1 + 1));
    var randomUno = Math.floor(Math.random() * (4 - 1 + 1));
    var randomDos = Math.floor(Math.random() * (4 - 1 + 1));
    var randomTres = Math.floor(Math.random() * (4 - 1 + 1));
    var randomCuatro = Math.floor(Math.random() * (4 - 1 + 1));
  }

  $("#uno").attr("src", animals[randomUno]);
  $("#dos").attr("src", animals[randomDos]);
  $("#tres").attr("src", animals[randomTres]);
  $("#cuatro").attr("src", animals[randomCuatro]);
  $("#resultado").attr("src", animals[random]);


  //------------------COMIENZO IF TEXTO------------------
  if($("#dificil").prop('checked')){
    if (random == 0) {
      $("#textoResultado").html("猫");
    } else if (random == 1) {
      $("#textoResultado").html("馬");
    } else if (random == 2) {
      $("#textoResultado").html("カンガルー");
    } else {
      $("#textoResultado").html("怠惰な");
    }
  }
  else{
  if (random == 0) {
    $("#textoResultado").html("GATO");
  } else if (random == 1) {
    $("#textoResultado").html("CABALLO");
  } else if (random == 2) {
    $("#textoResultado").html("CANGURO");
  } else {
    $("#textoResultado").html("PEREZOSO");
  }
}
  //------------------FINAL IF TEXTO------------------
}
  //------------------COMIENZO FUNCION CLICK------------------
  $(".imagen").click(function() {
    if(contador < 0){
      alert("Bienvenido!");
      contador++;
      aleatorio();
    }
    else if ($(this).attr("src") == $("#resultado").attr("src")) {
      alert("Acertaste");
      contador++;
      $("#aci").html(contador);
      if(contador == 6){
        $("#win").animate({height: '100%'});
        document.getElementById('cancion').pause();
        document.getElementById('audif').pause();
        document.getElementById('sngganar').play();
        $("#win").click(function(){
          location.reload();
        })
      }
      aleatorio();
    } else {
      alert("Fallaste");
      fracasos++;
      $("#fal").html(fracasos);
      if(fracasos == 6){
        $("#lose").animate({height: '100%'});
        document.getElementById('cancion').pause();
        document.getElementById('audif').pause();
        document.getElementById('sngperder').play();
        $("#lose").click(function(){
          location.reload();
        })
      }
      aleatorio();
    }
  })
  //------------------FINAL FUNCION CLICK------------------
})
//------------------FINAL SCRIPT------------------
