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
        let usuarios = await leerIndexedDB();
        for(const user of usuarios) {
            if (user.usuario === usuario && user.password === password) {
                user.isLogged = true;
            } else {
                user.isLogged = false;
            }
            await guardarUsuarioIndexedDB(user);
        };
        mensaje.textContent = `✅ Bienvenido, ${usuario}. Redirigiendo...`;
        setTimeout(() => {
            window.location.href = "cuaderno-index.html";
        }, 1500);

    } else {
        mensaje.textContent = "❌ Usuario o contraseña incorrectos.";
    }
});
