"use strict";

// Leer una cookie concreta por su nombre
function getCookie(nombre) {
    const cookies = document.cookie.split("; ");
    for (const c of cookies) {
        const [clave, valor] = c.split("=");
        if (clave === nombre) return valor;
    }
    return null;
}

// Borrar una cookie caducándola
function borrarCookie(nombre) {
    document.cookie = `${nombre}=; max-age=0; path=/`;
}
