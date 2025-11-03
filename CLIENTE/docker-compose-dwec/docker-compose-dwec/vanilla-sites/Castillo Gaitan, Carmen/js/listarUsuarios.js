"use strict";

async function listarUsuarios() {
    tabla.innerHTML = "";
    const usuarios = await leerIndexedDB();

    if (usuarios.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 4;
        td.textContent = "No hay usuarios guardados.";
        td.style.textAlign = "center";
        tr.appendChild(td);
        tabla.appendChild(tr);
        return;
    }

    usuarios.forEach(user => {
        const tr = document.createElement("tr");

        const tdNombre = document.createElement("td");
        tdNombre.textContent = user.nombre;

        const tdUsuario = document.createElement("td");
        tdUsuario.textContent = user.usuario;

        const tdRol = document.createElement("td");
        tdRol.textContent = user.tipo;

        const tdImagen = document.createElement("td");
        const img = document.createElement("img");

        if (user.imagen) {
            img.src = typeof user.imagen === "string"
                ? user.imagen
                : URL.createObjectURL(user.imagen);
            img.onload = () => URL.revokeObjectURL(img.src); // Liberamos memoria
        } else {
            img.src = "./img/iconoPorDefecto.png";
        }

        img.width = 40;
        img.height = 40;
        img.style.borderRadius = "50%";
        tdImagen.appendChild(img);

        const tdAcciones = document.createElement("td");

        // Botón Borrar
        const btnBorrar = document.createElement("button");
        btnBorrar.innerHTML = `<div>🗑️<div/>`;
        btnBorrar.addEventListener("click", async () => {
            await borrarUsuarioIndexedDB(user.usuario);
            await listarUsuarios();
        });
        tdAcciones.appendChild(btnBorrar);

        // Botón Actualizar
        const btnActualizar = document.createElement("button");
        btnActualizar.innerHTML = `<div>🔄<div/>`;
        btnActualizar.addEventListener("click", () => {
            nombre.value = user.nombre;
            usuario.value = user.usuario;
            password.value = user.password;
            rol.value = user.tipo;
            imagen.value = "";

            //Guardo valores originales antes de actualizar que voy a necesitar mas adelante
            imagenActual = user.imagen;
            usuarioOriginal = user.usuario; //para poder modificar el nombre de usuario que es clave primaria
            isLoggedOriginal = user.isLogged; //Para que no guarde el estado de un usuario no loggeado y se aplique al usuario activo y se cargue la sesión

            if (user.imagen) {
                preview.style.display = "block";
                preview.src = typeof user.imagen === "string"
                    ? user.imagen
                    : URL.createObjectURL(user.imagen);
            } else {
                preview.style.display = "block";
                preview.src = "./img/iconoPorDefecto.png";
                imagenActual = "./img/iconoPorDefecto.png";
            }

            mensaje.textContent = "Usuario cargado para actualizar";
        });
        tdAcciones.appendChild(btnActualizar);

        tr.appendChild(tdNombre);
        tr.appendChild(tdUsuario);
        tr.appendChild(tdRol);
        tr.appendChild(tdImagen);
        tr.appendChild(tdAcciones);
        tabla.appendChild(tr);
    });
}