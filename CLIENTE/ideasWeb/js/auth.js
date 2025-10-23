"use strict";

function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("No se pudo leer el archivo"));
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}


function getUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || {};
}

function setUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

/* 
async function registrarUsuario(usuario, password, nombre, file) {
    if (existeUsuario(usuario)) return false;
    if (!file) {
        alert("Selecciona una imagen");
        return false;
    }

    const usuarios = getUsuarios();
    const imagenBase64 = await fileToDataURL(file);

    usuarios[usuario] = {
        usuario,
        nombre,
        password,
        isLogged: false,
        imagen: imagenBase64
    };

    setUsuarios(usuarios);
    return true;
}

function existeUsuario(clave) {
    const usuarios = getUsuarios();
    for (let usuario in usuarios) {
        if (usuario === clave) {
            return true;
        }
    }
    return false;
} */


/* function credencialCorrecta(user, password) {
    const usuarios = getUsuarios();
    return usuarios[user] && usuarios[user].password === password;
} */

 async function credencialCorrecta(user, password) {
    const usuarios = await leerIndexedDB();
    let esCorrecta = false;

    usuarios.forEach(usuario => {
        if (usuario.usuario === user && usuario.password === password) {
            esCorrecta = true;
        }
    });

    return esCorrecta;
} 

/* function obtenerLoggedUser() {
    const usuarios = getUsuarios();
    for (let clave in usuarios) {
        if (usuarios[clave].isLogged === true) {
            return usuarios[clave];
        }
    }
    return null;
} */

async function obtenerLoggedUser() {
    const usuarios = await leerIndexedDB();

    for (const usuario of usuarios) {
        if (usuario.isLogged === true) {
            return usuario;
        }
    }
    return null;
}

function isLogged() {
   const usuarios = getUsuarios();
    for (let clave in usuarios) {
        if (usuarios[clave].isLogged === true) return true;
    }
    return false;
}

async function cerrarSesion(url) {
  let usuarios = await leerIndexedDB();
        for(const user of usuarios) {
            user.isLogged = "false";
            await guardarUsuarioIndexedDB(user);
        };
    setUsuarios(usuarios);
    window.location.href = url;
    cambiarMenu();
};


