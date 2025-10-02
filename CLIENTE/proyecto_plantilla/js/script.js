"use strict"

const publico = document.getElementsByClassName("publico");
const privado = document.getElementsByClassName("privado");
const nombreUsuario = document.getElementById("nombreUsuario");
const cerrarSesion = document.getElementById("cerrarSesion");

//Funcion que comprueba si hay algun usuario conectado
function compruebaCookie() {
    const cookies = document.cookie.split("; ");
    for (const c of cookies) {
        const [nombre, clave] = c.split("=");

        if (nombre === "isLoggedIn" && clave === "true") {
            ocultar(publico);
            mostrar(privado);
        }

        if (nombre === "usuario" && nombreUsuario) {
            nombreUsuario.innerHTML = `${clave}`;
        }
    }

}

document.addEventListener("DOMContentLoaded", compruebaCookie);


function borrarCookie() {
    const cookies = document.cookie.split("; ");
    for (const c of cookies) {
        const [nombre, clave] = c.split("=");
        if (nombre === "usuario") {
            document.cookie = `${nombre}=; max-age=0; path=/`;
        }
        if (nombre === "isLoggedIn") {
            document.cookie = `${nombre}="false"; max-age=0; path=/`;
        }
    }
};


cerrarSesion.addEventListener("click", () => {
    borrarCookie();
    for (const el of publico) {
        el.style.display = "block";
    }
    for (const ele of privado) {
        ele.style.display = "none";
    }

});
