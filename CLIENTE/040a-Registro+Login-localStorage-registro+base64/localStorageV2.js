"use strict";

const btnGuardar = document.getElementById("guardar");
const btnLeer = document.getElementById("leer");
const btnBorrar = document.getElementById("borrar");

const usuario = document.getElementById("usuario");
const nombre = document.getElementById("nombre");
const password = document.getElementById("password");

const mensaje = document.getElementById("mensaje");



btnGuardar.addEventListener("click", () => {
    const user = {
        nombre: nombre.value,
        usuario: usuario.value,
        password: password.value
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    usuarios[user.usuario] = user;
    let json = JSON.stringify(usuarios);
    localStorage.setItem("usuarios", json);

})

btnLeer.addEventListener("click", () => {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    const claves = Object.keys(usuarios);
    let listado = "";


    claves.forEach(clave => {
        const usuario = usuarios[clave];
        listado += `${usuario.nombre} <br>`

    }); 

    mensaje.innerHTML = listado;
});




btnBorrar.addEventListener("click", () => {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    const clave = usuario.value;
    if (usuarios[clave]) {
        delete usuarios[clave];
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mensaje.innerHTML = `Usuario "${clave}" borrado.`;  
    } else {
        mensaje.innerHTML = `Usuario "${clave}" no encontrado.`;
    }
});
