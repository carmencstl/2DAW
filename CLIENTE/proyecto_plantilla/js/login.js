"use strict";

const formulario = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!usuario || !password) {
        mensaje.textContent = "Por favor, rellena todos los campos.";
        return;
    }

    if (credencialCorrecta(usuario, password)) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
        for (let clave in usuarios) {
            usuarios[clave].isLogged = false;
        }
        usuarios[usuario].isLogged = true;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mensaje.textContent = `✅ Bienvenido, ${usuario}. Redirigiendo...`;
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);

    } else {
        mensaje.textContent = "❌ Usuario o contraseña incorrectos.";
    }
});
