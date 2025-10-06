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
        "nombre": nombre.value,
        "usuario": usuario.value,
        "password": password.value
    };

    let json = JSON.stringify(user);
    localStorage.setItem(user.usuario, json);
    mensaje.innerHTML = "Usuario guardado";
});



btnLeer.addEventListener("click", () => {
    const keysArrays = Object.keys(localStorage);
    let listado = "Los usuarios son: <br> "
    for (const clave of keysArrays) {
        listado += `Usuario: ${clave}, Nombre: ${JSON.parse(localStorage.getItem(clave)).nombre} <br>`;
    }
    mensaje.innerHTML = listado;
});


btnBorrar.addEventListener("click", () => {
    localStorage.removeItem(usuario.value);
});
