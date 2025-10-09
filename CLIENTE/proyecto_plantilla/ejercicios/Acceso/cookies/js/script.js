"use strict"

const clave = document.getElementById("clave");
const valor = document.getElementById("valor");

const guardarCookie = document.getElementById("guardarCookie");
const leerCookie = document.getElementById("leerCookie");
const borrarCookie = document.getElementById("borrarCookie");

const resultado = document.getElementById("resultado");

guardarCookie.addEventListener("click", () =>{
    document.cookie = `${clave.value}=${valor.value};max-age=5;path=/`;
});

leerCookie.addEventListener("click", () =>{
    resultado.innerHTML = document.cookie;
});

borrarCookie.addEventListener("click", () =>{
    document.cookie = `${clave.value}=;max-age=0;path=/`;
}); 



/*"use strict"
 Busco el valor de una cookie a traves de su clave. Si la encuentra
la devuelve y sino devuelve false 
function obtenerCookie(clave){
    const cookies = document.cookie.split("; ");
    for (const c of cookies) {
        const [usuario, password] = c.split("=");
        if (usuario === clave) return password;

    }
    return false;
}

 Crea una cookie recibiendo la clave y el valor, antes
comprueba que esa cookie no exite comprobando si existe la clave. 
function crearCookie(clave, valor){
    if(!obtenerCookie(clave)){
        document.cookie = `${clave}=${valor}; path=/; secure; samesite=Strict`;
        return true;
    }
    return false;
}

 Borrar una cookie caducandola 
function borrarCookie(nombre) {
    document.cookie = `${nombre}=; max-age=0; path=/`;
}


// archivo: js/registro.js
"use strict";

const formulario = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validar campos
    if (!usuario || !password) {
        mensaje.textContent = "Por favor, rellena todos los campos.";
        return;
    }
    crearCookie(usuario, password) ? mensaje.textContent = `✅ Usuario ${usuario} registrado correctamente. Redirigiendo a login...` : mensaje.textContent = "❌ El usuario ya existe. Por favor, elige otro.";

    
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
    
});

// archivo: js/login.js
"use strict";

const formulario = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");

function credencialCorrecta(usuario, password) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [clave, valor] = cookie.split("=");
        if (clave === usuario && valor === password) {
            return true;
        }
    }
    return false;
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validar campos
    if (!usuario || !password) {
        mensaje.textContent = "Por favor, rellena todos los campos.";
        return;
    }
    
    // Validar credenciales
    if (credencialCorrecta(usuario, password)) {
        document.cookie = `usuario=${usuario}; path=/`;
fu
        mensaje.textContent = `✅ Bienvenido, ${usuario}. Redirigiendo...`;
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    } else {
        mensaje.textContent = "❌ Usuario o contraseña incorrectos.";
    }
});




*/