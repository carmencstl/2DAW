"use strict";

<<<<<<< HEAD
const usuario = obtenerCookie("usuario");

const enlacesPublicos = document.getElementsByClassName("publico");
const enlacesPrivados = document.getElementsByClassName("privado");

const nombreUsuario = document.getElementById("nombreUsuario");
const cerrarSesion = document.getElementById("cerrarSesion");

=======
/* Obtengo la cookie con clave usuario */
const usuario = obtenerCookie("usuario");

/* Capturo los elementos del menu que voy a mostrar y voy a ocultar */
const enlacesPublicos = document.querySelectorAll(".publico");
const enlacesPrivados = document.querySelectorAll(".privado");

/* Capturo el elemento que va a mostrar el nombre de usuario */
const nombreUsuario = document.getElementById("nombreUsuario");
/* Capturo el boton para cerrar sesion */
const cerrarSesion = document.getElementById("cerrarSesion");

/* Compruebo si la cookie usuario existe, si existe significa
que el usuario esta logueado y si esta, oculto los enlaces publicos y muestro
los privados asi como el nombre del usuario */
>>>>>>> master
if(usuario){
    enlacesPublicos.forEach((elemento) => 
        (elemento.style.display = "none"));
    enlacesPrivados.forEach((elemento) => 
        (elemento.style.display = "block"));
<<<<<<< HEAD
}
=======
    nombreUsuario.innerHTML = `<a href="#"> ${usuario}</a>`;
}/* Sino esta logueado, revierto los cambios de enlaces. */
>>>>>>> master
else{
    enlacesPublicos.forEach((elemento) => 
        (elemento.style.display = "block"));
    enlacesPrivados.forEach((elemento) => 
        (elemento.style.display = "none"));
}

<<<<<<< HEAD
cerrarSesion.addEventListener("click", () => {
    borrarCookie();
    window.onload();
=======
/* añado un evento al pulsar el boton de cerrar sesion para que 
se borre la cookie usuario y recargue la pagina. ?Evita errores si no existe el boton */
cerrarSesion?.addEventListener("click", () => {
    borrarCookie("usuario");
    location.reload();
>>>>>>> master
})