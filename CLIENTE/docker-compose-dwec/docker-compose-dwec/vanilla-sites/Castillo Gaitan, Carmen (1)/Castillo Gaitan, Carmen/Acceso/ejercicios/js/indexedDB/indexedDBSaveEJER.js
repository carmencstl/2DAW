"use strict";

async function guardarUsuarioIndexedDBEjer(user) {
    try {

        if (!dbEjer) await abrirBaseDatosEjer();

        return new Promise((resolve, reject) => {
            const transaction = dbEjer.transaction("usuariosEjer", "readwrite");
            const store = transaction.objectStore("usuariosEjer");
            const requestEscribir = store.put(user); // Inserta o actualiza

            requestEscribir.onsuccess = () => {
                console.log(`✅ Usuario '${user.usuario}' guardado correctamente.`);
                resolve(true);
            };

            requestEscribir.onerror = (event) => {
                console.error("❌ Error al guardar usuario:", event.target.error);
                reject(event.target.error);
            };
        });

    } catch (e) {
        console.error("❌ Error en guardarUsuarioIndexedDB:", e);
    }
}
