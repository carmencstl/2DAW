"use strict";


let imagenActual = null;
let usuarioOriginal = "";
let isLoggedOriginal = null;

// Referencias DOM
const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const imagen = document.getElementById("imagen");
const btnGuardar = document.getElementById("guardar");
const btnEsperar = document.getElementById("esperar");
const resultado = document.getElementById("mensaje");
const tabla = document.getElementById("tablaUsuarios").querySelector("tbody");
const preview = document.getElementById("preview");
const rol = document.getElementById("rol");
const btnGuardarAPI = document.getElementById("guardarAPI");


//Funcion para limpiar valores e inputs
function limpiar() {
    document.querySelectorAll("input").forEach(input => input.value = "");
    rol.value = "user";
    preview.style.display = "none";
    imagenActual = null;
    usuarioOriginal = "";
    isLoggedOriginal = null;
}

listarUsuarios();

btnGuardar.addEventListener("click", async () => {
    const archivo = imagen.files[0];

    // Conservo el estado isLogged original al editar para no cerrar sesiones activas.

    const estado = isLoggedOriginal;


    const imagenFinal = archivo ? archivo : imagenActual ? imagenActual : preview.src;

    const user = {
        nombre: nombre.value,
        usuario: usuario.value,
        password: password.value,
        tipo: rol.value,
        isLogged: estado,
        imagen: imagenFinal,
    }

    if (imagenActual && usuarioOriginal) {
        await borrarUsuarioIndexedDB(usuarioOriginal);
    }

    await guardarUsuarioIndexedDB(user);
    listarUsuarios();

    limpiar();
})


btnGuardarAPI.addEventListener("click", async () => {
    let dataUser = await APIcall();

    dataUser = dataUser.results[0];
    nombre.value = dataUser.name.first;
    usuario.value = (dataUser.name.first.substring(0, 2) + dataUser.name.last.substring(0, 2)).toLowerCase();
    password.value = "dejameya";
    preview.src = dataUser.picture.thumbnail;
    preview.style.display = "block";
    rol.value = "user";

    //Decido crear un usuario nuevo y pasarlo con la funcion guardarenIndexDB para 
    //poder asignar mis propiedades concretas de mi pagina que la API no me da
    const user = {
        nombre: nombre.value,
        usuario: usuario.value,
        password: password.value,
        tipo: rol.value, //No me la da la API
        isLogged: false, //no me la da la API
        imagen: preview.src,
    }

    await guardarUsuarioIndexedDB(user);
    await listarUsuarios();

    limpiar();
})

