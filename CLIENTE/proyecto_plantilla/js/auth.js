"use strict"
/* Busco el valor de una cookie a traves de su clave. Si la encuentra
la devuelve y sino devuelve false */
function obtenerCookie(clave){
    const cookies = document.cookie.split("; ");
    for (const c of cookies) {
        const [usuario, password] = c.split("=");
        if (usuario === clave) return password;

    }
    return false;
}

/* Crea una cookie recibiendo la clave y el valor, antes
comprueba que esa cookie no exite comprobando si existe la clave. */
function crearCookie(clave, valor){
    if(!obtenerCookie(clave)){
        document.cookie = `${clave}=${valor}; path=/; secure; samesite=Strict`;
        return true;
    }
    return false;
}

/* Borrar una cookie caducandola */
function borrarCookie(nombre) {
    document.cookie = `${nombre}=; max-age=0; path=/`;
}