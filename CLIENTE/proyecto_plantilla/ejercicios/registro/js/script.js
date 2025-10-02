"use strict"

const usuario = document.getElementById("clave");
const valor = document.getElementById("valor");
const guardarCookie = document.getElementById("guardarCookie");
const mensaje = document.getElementById("mensaje");

const comprobarUsuario = () => {
    const cookies = document.cookie.split("; ");
    for (const c of cookies) {
        const [nombre, contrasenia] = c.split("=");
        if (usuario.value === nombre) {
            return true;
        }
    }
    return false;
};


guardarCookie.addEventListener("click", () =>{
    if(!comprobarUsuario()){
        document.cookie = `${usuario.value}=${valor.value};path=/`;
        mensaje.innerHTML = "Usuario registrado con exito";
    }
    else{
    mensaje.innerHTML = "El nombre de usuario ya esta registrado";
    }
});

