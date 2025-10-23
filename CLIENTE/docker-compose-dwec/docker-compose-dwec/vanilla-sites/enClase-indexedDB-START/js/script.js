"use strict";

let imagenActual = null;

// Referencias DOM
const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const imagen = document.getElementById("imagen");
const btnGuardar = document.getElementById("guardar");
/* const btnBorrar = document.getElementById("borrar");
const btnEsperar = document.getElementById("esperar"); */
const resultado = document.getElementById("mensaje");
const tabla = document.getElementById("tablaUsuarios").querySelector("tbody");
const preview = document.getElementById("preview");
const btnGuardarAPI = document.getElementById("guardarAPI");

listarUsuarios();

btnGuardar.addEventListener("click", async () => {
    const archivo = imagen.files[0];

    const imagenFinal = archivo
        ? archivo
        : imagenActual
            ? imagenActual
            : preview.src;

    const user = {
        nombre: nombre.value,
        usuario: usuario.value,
        password: password.value,
        imagen: imagenFinal, // recuerda, esto es un blob, INDEXDB HACE LA CONVERSION A STRING POR NOSOTROS
    }

    await guardarUsuarioIndexedDB(user);
    listarUsuarios();
})

btnGuardarAPI.addEventListener("click", async () => {
    let dataUser = await APIcall();

    dataUser = dataUser.results[0];
    nombre.value = dataUser.name.first;
    usuario.value = (dataUser.name.first.substring(0, 2) + dataUser.name.last.substring(0, 2)).toLowerCase();
    password.value = "dejameya";
    preview.src = dataUser.picture.thumbnail;

    btnGuardar.click();
})

/* btnBorrar.addEventListener("click", async () => {

    if (!usuario.value) return resultado.innerHTML = "Selecciona un usuario antes de borrar";

    await borrarUsuarioIndexedDB(usuario.value);
    listarUsuarios();
}) */

/* btnEsperar.addEventListener("click", async () => {
    console.log("Estoy aquii")
    await new Promise(resolve => setTimeout(resolve, 10000));

    const user = {
        nombre: 'John',
        usuario: 'Doe',
        password: 'dejameya',
        imagen: './img/user.png',
    };
    await guardarUsuarioIndexedDB(user);
    listarUsuarios();
}) */