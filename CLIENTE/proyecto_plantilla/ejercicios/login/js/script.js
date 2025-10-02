"use strict"

const usuario = document.getElementById("clave");
const contrasenia = document.getElementById("valor");
const iniciarSesion = document.getElementById("iniciarSesion");
const mensaje = document.getElementById("mensaje");

iniciarSesion.addEventListener("click", () => {
    
    const cookies = document.cookie.split("; ");
    for (const c of cookies) {
        const [nombre, clave] = c.split("=");
        if (usuario.value === nombre && contrasenia.value === clave) {
            document.cookie = `usuario=${usuario.value};path=/`;
            document.cookie = `isLoggedIn=true;path=/`;
            window.location.href = "../../index.html"
        }
    }
    mensaje.innerHTML = "Credenciales incorrectas"
    return false;
});


