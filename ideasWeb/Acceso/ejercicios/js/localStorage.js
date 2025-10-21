"use strict";

const btnGuardar = document.getElementById("guardar");
const btnUno = document.getElementById("mostrarUno");
const btnTodos = document.getElementById("mostrarTodos");
const btnBorrar = document.getElementById("borrar");

const mensajeError = document.getElementById("mensajeError");
const mensajeExito = document.getElementById("mensajeExito");
const mensajeInfo = document.getElementById("mensajeInfo");
const textoError = document.getElementById("textoError");
const textoExito = document.getElementById("textoExito");
const textoInfo = document.getElementById("textoInfo");
const contenedorUsuarios = document.getElementById("contenedorUsuarios");

// Convertir archivo de imagen a base64
function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("No se pudo leer el archivo"));
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

// Ocultar todos los mensajes y contenedores
function ocultarTodo() {
    mensajeError.style.display = "none";
    mensajeExito.style.display = "none";
    mensajeInfo.style.display = "none";
    contenedorUsuarios.style.display = "none";
    contenedorUsuarios.innerHTML = "";
}

// Mostrar mensaje de error
function mostrarError(texto) {
    ocultarTodo();
    textoError.textContent = texto;
    mensajeError.style.display = "block";
}

// Mostrar mensaje de éxito
function mostrarExito(texto) {
    ocultarTodo();
    textoExito.textContent = texto;
    mensajeExito.style.display = "block";
}

// Mostrar mensaje de info
function mostrarInfo(texto) {
    ocultarTodo();
    textoInfo.textContent = texto;
    mensajeInfo.style.display = "block";
}

// GUARDAR dato (nombre, clave, foto)
async function guardarDato(nombre, clave, file) {
    if (!file) {
        mostrarError("❌ Selecciona una imagen");
        return false;
    }
    
    const datos = JSON.parse(localStorage.getItem("datos")) || {};
    const imagenBase64 = await fileToDataURL(file);
    
    datos[nombre] = {
        nombre: nombre,
        clave: clave,
        imagen: imagenBase64
    };
    
    localStorage.setItem("datos", JSON.stringify(datos));
    return true;
}

// LEER dato por nombre
function leerDato(nombre) {
    const datos = JSON.parse(localStorage.getItem("datos")) || {};
    return datos[nombre] || null;
}

// BORRAR dato por nombre
function borrarDato(nombre) {
    const datos = JSON.parse(localStorage.getItem("datos")) || {};
    delete datos[nombre];
    localStorage.setItem("datos", JSON.stringify(datos));
}

// LEER todos los datos
function leerTodosDatos() {
    return JSON.parse(localStorage.getItem("datos")) || {};
}

// Mostrar un usuario en el contenedor
function mostrarUsuario(dato) {
    ocultarTodo();
    
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-usuario";
    
    const nombre = document.createElement("p");
    nombre.innerHTML = `<strong>Nombre:</strong> ${dato.nombre}`;
    
    const clave = document.createElement("p");
    clave.innerHTML = `<strong>Clave:</strong> ${dato.clave}`;
    
    const imagen = document.createElement("img");
    imagen.src = dato.imagen;
    imagen.width = 200;
    imagen.alt = "Foto de usuario";
    
    tarjeta.appendChild(nombre);
    tarjeta.appendChild(clave);
    tarjeta.appendChild(imagen);
    
    contenedorUsuarios.appendChild(tarjeta);
    contenedorUsuarios.style.display = "block";
}

// Mostrar todos los usuarios
function mostrarTodosUsuarios(datos) {
    ocultarTodo();
    
    for (let nombre in datos) {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta-usuario";
        
        const nombreP = document.createElement("p");
        nombreP.innerHTML = `<strong>Nombre:</strong> ${datos[nombre].nombre}`;
        
        const claveP = document.createElement("p");
        claveP.innerHTML = `<strong>Clave:</strong> ${datos[nombre].clave}`;
        
        const imagen = document.createElement("img");
        imagen.src = datos[nombre].imagen;
        imagen.width = 150;
        imagen.alt = "Foto de usuario";
        
        tarjeta.appendChild(nombreP);
        tarjeta.appendChild(claveP);
        tarjeta.appendChild(imagen);
        
        contenedorUsuarios.appendChild(tarjeta);
    }
    
    contenedorUsuarios.style.display = "block";
}

// Event listeners
btnGuardar.addEventListener("click", async () => {
    const nombre = document.getElementById("clave").value.trim();
    const clave = document.getElementById("valor").value.trim();
    const imagenInput = document.getElementById("imagenPerfil");
    const archivo = imagenInput.files[0];
    
    if (!nombre || !clave) {
        mostrarError("❌ Completa nombre y clave");
    }
    
    const exito = await guardarDato(nombre, clave, archivo);
    if (exito) {
        mostrarExito("✅ Usuario guardado correctamente");
    }
});

btnUno.addEventListener("click", () => {
    const nombre = document.getElementById("clave").value.trim();
    if (!nombre) {
        mostrarError("❌ Escribe un nombre para buscar");
    }
    
    const dato = leerDato(nombre);
    
    if (dato) {
        mostrarUsuario(dato);
    } else {
        mostrarError("❌ No se encontró ese usuario");
    }
});

btnTodos.addEventListener("click", () => {
    const datos = leerTodosDatos();
    
    if (Object.keys(datos).length === 0) {
        mostrarInfo("ℹ️ No hay usuarios guardados");
        return;
    }
    
    mostrarTodosUsuarios(datos);
});

btnBorrar.addEventListener("click", () => {
    const nombre = document.getElementById("clave").value.trim();
    if (!nombre) {
        mostrarError("❌ Escribe el nombre del usuario a borrar");
        return;
    }
    
    const dato = leerDato(nombre);
    if (!dato) {
        mostrarError("❌ No existe ese usuario");
        return;
    }
    
    borrarDato(nombre);
    mostrarExito(`✅ Usuario "${nombre}" borrado correctamente`);
    document.getElementById("clave").value = "";
});