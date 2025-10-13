"use strict";

console.log("se")
const enlacesPublicos = document.querySelectorAll(".publico");
const enlacesPrivados = document.querySelectorAll(".privado");

const nombreUsuario = document.getElementById("nombreUsuario");
const cerrarSesion = document.getElementById("cerrarSesion");
const imagenPerfil = document.getElementById("imagen"); 

function cambiarMenu() {
    const usuario = obtenerLoggedUser();

    if (usuario) {
        enlacesPublicos.forEach(e => e.style.display = "none");
        enlacesPrivados.forEach(e => e.style.display = "block");
        nombreUsuario.innerHTML = `<a href="#">${usuario.usuario}</a>`;

        if (usuario.imagen) {
            imagenPerfil.src = usuario.imagen;
        }
    } else {
        enlacesPublicos.forEach(e => e.style.display = "block");
        enlacesPrivados.forEach(e => e.style.display = "none");
        nombreUsuario.innerHTML = "";

        imagenPerfil.src = "./img/user.png";
    }
}

document.addEventListener("DOMContentLoaded", cambiarMenu);
