"use strict";

async function leerIndexedDB() {
    try {
        if (!db) await abrirBaseDatos();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("usuarios", "readonly");
            const store = transaction.objectStore("usuarios");
            const requestLeer = store.getAll();

            requestLeer.onsuccess = () => {
                const usuarios = requestLeer.result;
                resolve(usuarios);
            };

            requestLeer.onerror = (event) => {
                console.error("❌ Error al leer usuarios:", event.target.error);
                reject(event.target.error);
            };
        });

    } catch (e) {
        console.error("❌ Error en mostrarUsuariosIndexedDB:", e);
    }
}

//He incluido esta funcion para obtener solo un usuario a traves de su
// primary key, la necesito para el login
async function leerUsuarioPorClave(nombreUsuario) {
    try {
        if (!db) await abrirBaseDatos();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("usuarios", "readonly");
            const store = transaction.objectStore("usuarios");
            const request = store.get(nombreUsuario); 

            request.onsuccess = () => {
                const usuario = request.result;
                resolve(usuario); 
            };

            request.onerror = (event) => {
                console.error("❌ Error al leer usuario:", event.target.error);
                reject(event.target.error);
            };
        });

    } catch (e) {
        console.error("❌ Error en leerUsuarioPorClave:", e);
    }
}