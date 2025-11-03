"use strict";

async function listarUsuarios() {
    tabla.innerHTML = "";
    const usuarios = await leerIndexedDBEjer();

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

        const tdImagen = document.createElement("td");
        const img = document.createElement("img");
        img.src = typeof user.imagen === "string" ? user.imagen : URL.createObjectURL(user.imagen);
        img.width = 40;
        img.img = 40;
        img.style.borderRadius = "50%";
        img.onload = () => URL.revokeObjectURL(img.src); //Liberamos memoria
        tdImagen.appendChild(img);

        //Para los botones del CRUD
        const tdAcciones = document.createElement("td");

        const btnBorrar = document.createElement("button");
        btnBorrar.innerHTML = `<img src="../../img/delete.png" width="22" height="22" />`;
        btnBorrar.addEventListener("click", async () => {
            await borrarUsuarioIndexedDBEjer(user.usuario);
            await listarUsuarios();
        });
        tdAcciones.appendChild(btnBorrar);

        const btnActualizar = document.createElement("button");
        btnActualizar.innerHTML = `<img src="../../img/update.png" width="22" height="22" />`;
        btnActualizar.addEventListener("click", async () => {
            await borrarUsuarioIndexedDBEjer(user.usuario);

            nombre.value = user.nombre;
            usuario.value = user.usuario;
            password.value = user.password;
            
            imagen.value = null;

            imagenActual = user.imagen;

            if (user.imagen) {
                preview.style.display = "block";
                preview.src = typeof user.imagen === "string" ? user.imagen : URL.createObjectURL(user.imagen);
            }
            await listarUsuarios();
            mensaje.textContent = "Usuario Cargado para actualizar";
        });
        tdAcciones.appendChild(btnActualizar);

        tr.appendChild(tdNombre);
        tr.appendChild(tdUsuario);
        tr.appendChild(tdImagen);
        tr.appendChild(tdAcciones);
        tabla.appendChild(tr);




    });
}
