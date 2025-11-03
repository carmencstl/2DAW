"use strict";

const formulario = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!usuario || !password) {
        mensaje.textContent = "Por favor, rellena todos los campos.";
        return;
    }

    if (await credencialCorrecta(usuario, password)) {
        //Uso esta funcion para no tener que recorrer todos los usuarios
        //y que sea mas eficiente
        const user = await leerUsuarioPorClave(usuario);
        if (user) {
            user.isLogged = true;
            await guardarUsuarioIndexedDB(user);
        }

        mensaje.textContent = `✅ Bienvenido, ${usuario}. Redirigiendo...`;
        setTimeout(() => {
            window.location.href = "cuaderno-index.html";
        }, 1500);

    } else {
        mensaje.textContent = "❌ Usuario o contraseña incorrectos.";
    }
});
