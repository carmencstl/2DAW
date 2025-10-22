"use strict";

// Referencias DOM
const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const imagen = document.getElementById("imagen");
const btnGuardar = document.getElementById("guardar");
const btnBorrar = document.getElementById("borrar");
const btnEsperar = document.getElementById("esperar");
const resultado = document.getElementById("mensaje");
const tabla = document.getElementById("tablaUsuarios").querySelector("tbody");


listarUsuarios();

btnGuardar.addEventListener("click", async () => {
    const archivo = imagen.files[0];
    if (!archivo) {
        return resultado.innerHTML = "Selecciona una imagen";
    }

    const user = {
        nombre: nombre.value,
        usuario: usuario.value,
        password: password.value,
        imagen: archivo, // recuerda, esto es un blob, INDEXDB HACE LA CONVERSION A STRING POR NOSOTROS
    }

    await guardarUsuarioIndexedDB(user);
    listarUsuarios();
})

btnBorrar.addEventListener("click", async () => {

    if (!usuario.value) return resultado.innerHTML = "Selecciona un usuario antes de borrar";

    await borrarUsuarioIndexedDB(usuario.value);
    listarUsuarios();
})

btnEsperar.addEventListener("click", async () => {
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
})