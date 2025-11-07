"use strict";

console.log("Script cargado correctamente");

const enlacesPublicos = document.querySelectorAll(".publico");
const enlacesPrivados = document.querySelectorAll(".privado");

const nombreUsuario = document.getElementById("username");
const imagenPerfil = document.getElementById("userPhoto");

const crud = document.getElementById("admin");

async function cambiarMenu() {
    const usuario = await obtenerLoggedUser();

    if (usuario) {
        enlacesPublicos.forEach(e => e.style.display = "none");
        enlacesPrivados.forEach(e => e.style.display = "block");

        nombreUsuario.innerHTML = usuario.usuario;
        if (usuario.imagen) {
            imagenPerfil.src = typeof usuario.imagen === "string" ? usuario.imagen : URL.createObjectURL(usuario.imagen);
            imagenPerfil.onload = () => URL.revokeObjectURL(imagenPerfil.src);
        }

        //Muestro el crud si el usuario es de tipo admin
        if (usuario.tipo === "admin") {
            crud.style.display = "block";
        }

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
