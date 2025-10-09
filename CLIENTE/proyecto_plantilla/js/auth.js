"use strict"

const nombreUsuario = document.getElementById("usuario").value;
const password = document.getElementById("password");
const nombre = document.getElementById("nombre");

function registrarUsuario(user) {
    if (!existeUsuario(user.usuario)) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
        usuarios[user.usuario] = user;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        return true;
    }
    return false;
}

function existeUsuario(clave) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    for (let usuario in usuarios) {
        if (usuario === clave) {
            return true;
        }
    }
    return false;
}

function credencialCorrecta(user, password) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    for (let usuario in usuarios) {
        if (user === usuarios[usuario].usuario && password === usuarios[usuario].password) {
            return true;
        }
    }
    return false;

}

function isLogged(usuario){
     let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
        if (usuarios[usuario].isLogged == true) {
            return true;
        }
    return false;
}

