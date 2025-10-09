"use strict";

function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("No se pudo leer el archivo"));
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

async function registrarUsuario(usuario, password, nombre, file) {

    if (!existeUsuario(usuario)) { 
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

        if (!file) {
            alert("Selecciona una imagen");
        } else {
            const imagenBase64 = await fileToDataURL(file);
            usuarios[usuario] = {
                usuario,
                nombre,
                password,
                isLogged: false,
                imagen: imagenBase64   
            };
        }

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
    return usuarios[user] && usuarios[user].password === password;
}


function obtenerLoggedUser() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    for (let clave in usuarios) {
        if (usuarios[clave].isLogged === true) {
            return usuarios[clave];
        }
    }
    return null;
}

function isLogged() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    for (let clave in usuarios) {
        if (usuarios[clave].isLogged === true) return true;
    }
    return false;
}

cerrarSesion?.addEventListener("click", () => {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    for (let clave in usuarios) {
        usuarios[clave].isLogged = false;
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    cambiarMenu();
});


