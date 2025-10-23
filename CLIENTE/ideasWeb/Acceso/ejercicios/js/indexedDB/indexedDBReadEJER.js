"use strict";

async function leerIndexedDB() {
    try {
        if (!db) await abrirBaseDatos();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("usuariosEjer", "readonly");
            const store = transaction.objectStore("usuariosEjer");
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
