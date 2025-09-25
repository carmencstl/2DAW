"use strict"

const btnClase = document.getElementById("btnClase");
const btnEtiqueta = document.getElementById("btnEtiqueta");

function resaltarParrafos(){
    const parrafos = document.getElementsByClassName("texto");
    for(let i = 0; i < parrafos.length; i++){
        parrafos[i].style.backgroundColor = "pink";
        parrafos[i].style.border = "1px solid purple";
        parrafos[i].style.borderRadius = "3px";
        parrafos[i].style.padding = "5px";
    }

}

function resaltarTitulos(){
    const titulos = document.getElementsByClassName("titulos");
        for(let i = 0; i < titulos.length; i++){
        titulos[i].style.color = "purple";
        titulos[i].style.textDecoration = "underline";
    }

}

btnClase.onclick = resaltarParrafos;
btnEtiqueta.onclick = resaltarTitulos;