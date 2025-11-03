"use strict";

async function leerIndexedDBEjer() {
    try {
        if (!dbEjer) await abrirBaseDatosEjer();

        return new Promise((resolve, reject) => {
            const transaction = dbEjer.transaction("usuariosEjer", "readonly");
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
