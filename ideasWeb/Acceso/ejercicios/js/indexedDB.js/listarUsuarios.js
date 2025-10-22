"use strict";

const table = document.getElementById("tablaUsuarios");

async function listarUsuarios() {
    tabla.innerHTML = "";
    const usuarios = await leerIndexedDB();

    if (usuarios.length === 0) {

        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 4;
        td.textContent = "<p> No hay usuarios guardados. </p>";
        td.style.textAlign = "center";
        tr.appendChild(td);
        table.appendChild(tr);
        return;
    }
    /*     resultado.innerHTML = "<h3> Usuarios guardados. </h3>"; */

    /*     for (const user of usuarios) { */
    usuarios.forEach(user => {

        const tr = document.createElement("tr");

        const tdNombre = document.createElement("td");
        tdNombre.textContent = user.nombre;

        const tdUsuario = document.createElement("td");
        tdUsuario.textContent = user.user;

        const tdImagen = document.createElement("td");

        if(user.imagen){
            const url =  URL.createObjectURL(user.imagen);
            const img = document.createElement("img");
            img.src = url;
            img.width = 40;
            img.height = 40;
            img.style.borderRadius = "50%";
            tdImagen.appendChild(img);
        }
        else{
            tdImagen.textContent = "-";
        }

        let imgSrc = typeof user.imagen === "string" ? user.imagen : URL.createObjectURL(user.imagen);
        resultado.innerHTML +=
            `<div style = "margin-bottom: 10px;">
                <img src = "${imgSrc}" width="30px">
                <b>${user.nombre}</b> (${user.usuario})<b>
            </div>`


        //Cuando hacemos la transformación a url, debemos hacer esto y liberar la memoria que ocupa la imagen. 
        if (user.imagen instanceof Blob) {
            const urlTemp = imgSrc;
            const img = new Image();
            img.onload = () => URL.revokeObjectURL(imgSrc);
            img.src = urlTemp;
        }
    });
}
