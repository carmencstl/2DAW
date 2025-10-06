// archivo: js/login.js
"use strict";

document.addEventListener("DOMContentLoaded", () => {
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

        // Buscar cookie con nombre de usuario
        const cookies = document.cookie.split("; ");
        let credencialCorrecta = false;

        for (const c of cookies) {
            const [clave, valor] = c.split("=");
            if (clave === usuario && valor === password) {
                credencialCorrecta = true;
                break;
            }
        }

        if (credencialCorrecta) {
            document.cookie = `usuario=${usuario}; path=/`;
            document.cookie = `loggedIn=true; path=/`;

            mensaje.textContent = `✅ Bienvenido, ${usuario}. Redirigiendo...`;
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } else {
            mensaje.textContent = "❌ Usuario o contraseña incorrectos.";
        }
    });
});
