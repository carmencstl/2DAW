"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const estaLogueado = getCookie("loggedIn");
    const usuario = getCookie("usuario");

    const enlacesPrivados = document.querySelectorAll(".privado");
    const enlacesPublicos = document.querySelectorAll(".publico");
    const elementoUsuario = document.getElementById("usuario");
    const cerrarSesion = document.getElementById("cerrarSesion");

    if (estaLogueado === "true" && usuario) {
        // Mostrar enlaces privados y públicos
        enlacesPrivados.forEach(el => el.style.display = "inline-block");
        enlacesPublicos.forEach(el => el.style.display = "none");
        elementoUsuario.innerHTML = `<a href="#">👤 ${usuario}</a>`;
    } else {
        // Mostrar solo enlaces públicos
        enlacesPrivados.forEach(el => el.style.display = "none");
        enlacesPublicos.forEach(el => el.style.display = "inline-block");
    }

    // Evento para cerrar sesión
    cerrarSesion?.addEventListener("click", (e) => {
        e.preventDefault();
        borrarCookie("loggedIn");
        borrarCookie("usuario");
        location.reload();
    });
});
