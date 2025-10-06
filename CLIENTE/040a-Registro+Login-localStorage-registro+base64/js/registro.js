// archivo: js/registro.js
"use strict";

// ✅ Función para convertir una imagen a base64
async function convertirA64(file) {
    return new Promise((resolve, reject) => {
        const lector = new FileReader();

        lector.onload = () => resolve(lector.result); // Cuando termina de leer
        lector.onerror = () => reject("❌ Error al leer la imagen");

        lector.readAsDataURL(file); // Método para obtener base64
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formRegistro");
    const mensaje = document.getElementById("mensaje");

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const usuario = document.getElementById("usuario").value.trim();
        const password = document.getElementById("password").value.trim();
        const imagenInput = document.getElementById("imagen");

        // Validación básica
        if (!nombre || !usuario || !password) {
            mensaje.textContent = "❗ Rellena todos los campos.";
            return;
        }

        // ✅ Convertimos la imagen a base64 si el usuario ha subido una
        let imagenBase64 = "";
        if (imagenInput.files.length > 0) {
            imagenBase64 = await convertirA64(imagenInput.files[0]);
        }

        // ✅ Creamos un objeto con los datos del usuario
        const nuevoUsuario = {
            nombre,
            usuario,
            password,
            imagen: imagenBase64
        };

        // ✅ Guardamos el objeto en localStorage (convertido a texto)
        localStorage.setItem(usuario, JSON.stringify(nuevoUsuario));

        mensaje.textContent = `✅ Usuario "${usuario}" registrado correctamente.`;

        // Opcional: redireccionar a login después de 2 segundos
        /*
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
        */
    });
});


