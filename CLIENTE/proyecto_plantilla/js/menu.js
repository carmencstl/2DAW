"use strict";



const enlacesPublicos = document.querySelectorAll(".publico");
const enlacesPrivados = document.querySelectorAll(".privado");

const nombreUsuario = document.getElementById("nombreUsuario");
const cerrarSesion = document.getElementById("cerrarSesion");

/* Compruebo si la cookie usuario existe, si existe significa
que el usuario esta logueado y si esta, oculto los enlaces publicos y muestro
los privados asi como el nombre del usuario */
if (isLogged()) {
    enlacesPublicos.forEach((elemento) =>
        (elemento.style.display = "none"));
    enlacesPrivados.forEach((elemento) =>
        (elemento.style.display = "block"));
    nombreUsuario.innerHTML = `<a href="#"> ${logged}</a>`;/* Sino esta logueado, revierto los cambios de enlaces. */
}
else {
    enlacesPublicos.forEach((elemento) =>
        (elemento.style.display = "block"));
    enlacesPrivados.forEach((elemento) =>
        (elemento.style.display = "none"));
}


/* añado un evento al pulsar el boton de cerrar sesion para que 
se borre la cookie usuario y recargue la pagina. ?Evita errores si no existe el boton */
cerrarSesion?.addEventListener("click", () => {
    borrarCookie("loggedIn");
    location.reload();
})