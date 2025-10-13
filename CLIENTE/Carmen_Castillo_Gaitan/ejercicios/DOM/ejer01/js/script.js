"use strict"

const boton = document.getElementById("boton"); //apunta al objeto grafico en el html con ese id
const resultado = document.getElementById("resultado");

function mostrar (){
    resultado.innerHTML = "¡Has pulsado el botón correctamente!"; // cambia el contenido dentro de las etiquetas en el html 
}

boton.onclick = mostrar; //cuando se hace click sobre ese objeto
