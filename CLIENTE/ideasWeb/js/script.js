"use strict";

let imagenActual = null;

// Referencias DOM
const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const imagen = document.getElementById("imagen");
const btnGuardar = document.getElementById("guardar");
const btnEsperar = document.getElementById("esperar");
const resultado = document.getElementById("mensaje");
const tabla = document.getElementById("tablaUsuarios").querySelector("tbody");
const preview = document.getElementById("preview");
const rol = document.getElementById("rol");
 const btnGuardarAPI = document.getElementById("guardarAPI"); 

listarUsuarios();

btnGuardar.addEventListener("click", async () => {
    const archivo = imagen.files[0];
    const usuarioActivo = await obtenerLoggedUser();
    let estado = usuarioActivo && usuario.value === usuarioActivo.usuario;

    const imagenFinal = archivo
        ? archivo
        : imagenActual
            ? imagenActual
            : preview.src;

    const user = {
        nombre: nombre.value,
        usuario: usuario.value,
        password: password.value,
        tipo: rol.value,
        isLogged: estado,
        imagen: imagenFinal, // recuerda, esto es un blob, INDEXDB HACE LA CONVERSION A STRING POR NOSOTROS
    }

    //Uso imagenActual como referencia para saber si estoy actualizando los datos de un usuario para borralo en ese caso y asi
    //no borrarlo automaticamente en cuanto pulso el boton actualizar, gracias a esto puedo obtener el valor de la propiedad
    //isLogged y dejar su estado actual a la hora de borrar y crear de nuevo el usuario. Esto lo necesito cuando quiero editar al usuario loggeado
    if (imagenActual) {
        await borrarUsuarioIndexedDB(usuario.value);
    }

    await guardarUsuarioIndexedDB(user);
    listarUsuarios();

    //No me gustaba que se mantuvieran los values en los inputs una vez se actualizaban los datos del usuario
    document.querySelectorAll("input").forEach(input => input.value = "");
    preview.style.display = "none";
    imagenActual = null;
})

 btnGuardarAPI.addEventListener("click", async () => {
    let dataUser = await APIcall();

    dataUser = dataUser.results[0];
    nombre.value = dataUser.name.first;
    usuario.value = (dataUser.name.first.substring(0, 2) + dataUser.name.last.substring(0, 2)).toLowerCase();
    password.value = "dejameya";
    preview.src = dataUser.picture.thumbnail;

    btnGuardar.click();
}) 
