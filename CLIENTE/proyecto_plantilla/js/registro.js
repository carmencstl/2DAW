"use strict";

const formulario = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", async (e) => {  
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const file = document.getElementById("imagenPerfil").files[0];

    if (!usuario || !password || !nombre) {
        mensaje.textContent = "Por favor, rellena todos los campos.";
        return true;
    }

    const registrado = await registrarUsuario(usuario, password, nombre, file); // <-- await

    if (registrado) {
        mensaje.textContent = `✅ Usuario ${usuario} registrado correctamente. Redirigiendo a login...`;
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    } else {
        mensaje.textContent = "❌ El usuario ya existe. Por favor, elige otro.";
    }
});
