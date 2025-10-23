"use strict";

async function borrarUsuarioIndexedDB(usuarioClave) {
    try {

        if (!db) await abrirBaseDatos();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("usuarios", "readwrite");
            const store = transaction.objectStore("usuarios");
            const requestBorrar = store.delete(usuarioClave);

            requestBorrar.onsuccess = () => {
                console.log(`✅ Usuario '${usuarioClave}' borrado correctamente.`);
                resolve(true);
            };

            requestBorrar.onerror = (event) => {
                console.error("❌ Error al borrar usuario:", event.target.error);
                reject(event.target.error);
            };
        });

    } catch (e) {
        console.error("❌ Error en borrarUsuarioIndexedDB:", e);
    }
}
