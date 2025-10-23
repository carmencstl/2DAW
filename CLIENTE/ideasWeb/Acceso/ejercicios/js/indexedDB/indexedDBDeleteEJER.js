"use strict";

async function borrarUsuarioIndexedDBEjer(usuarioClave) {
    try {

        if (!dbEjer) await abrirBaseDatosEjer();

        return new Promise((resolve, reject) => {
            const transaction = dbEjer.transaction("usuariosEjer", "readwrite");
            const store = transaction.objectStore("usuariosEjer");
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
