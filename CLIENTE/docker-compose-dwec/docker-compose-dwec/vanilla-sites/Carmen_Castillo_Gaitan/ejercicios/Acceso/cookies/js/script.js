"use strict"

const clave = document.getElementById("clave");
const valor = document.getElementById("valor");

const guardarCookie = document.getElementById("guardarCookie");
const leerCookie = document.getElementById("leerCookie");
const borrarCookie = document.getElementById("borrarCookie");

const resultado = document.getElementById("resultado");

guardarCookie.addEventListener("click", () =>{
    document.cookie = `${clave.value}=${valor.value};max-age=60;path=/`;
});

leerCookie.addEventListener("click", () =>{
    resultado.innerHTML = document.cookie;
});

borrarCookie.addEventListener("click", () =>{
    document.cookie = `${clave.value}=;max-age=0;path=/`;
}); 



