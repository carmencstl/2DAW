"use strict";

console.log("Script cargado correctamente");

const enlacesPublicos = document.querySelectorAll(".publico");
const enlacesPrivados = document.querySelectorAll(".privado");

const nombreUsuario = document.getElementById("username"); 
const imagenPerfil = document.getElementById("userPhoto"); 

async function cambiarMenu() {
    const usuario = await obtenerLoggedUser(); 

    if (usuario) {
        enlacesPublicos.forEach(e => e.style.display = "none");
        enlacesPrivados.forEach(e => e.style.display = "block");

        nombreUsuario.innerHTML = usuario.usuario;
        imagenPerfil.src = usuario.imagen || "img/iconoPorDefecto.png";

    } else {
        // Mostrar solo los elementos públicos
        enlacesPublicos.forEach(e => e.style.display = "block");
        enlacesPrivados.forEach(e => e.style.display = "none");

        // Limpiar nombre e imagen
        nombreUsuario.innerHTML = "Estudiante";
        imagenPerfil.src = "img/iconoPorDefecto.png";
    }
}

document.addEventListener("DOMContentLoaded", cambiarMenu);
