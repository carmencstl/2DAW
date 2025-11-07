"use strict";

let dbEjer;

function abrirBaseDatosEjer() {
    return new Promise((resolve, reject) => {
        const requestDB = indexedDB.open("UsuariosIDBejer", 1);

        requestDB.onupgradeneeded = (event) => {
            dbEjer = event.target.result;
            if (!dbEjer.objectStoreNames.contains("usuariosEjer")) {
                const store = dbEjer.createObjectStore("usuariosEjer", { keyPath: "usuario" });
                store.createIndex("nombre", "nombre", { unique: false });
            }
        };

        requestDB.onsuccess = (event) => {
            dbEjer = event.target.result;
            console.log("✅ Base de datos abierta correctamente.");
            resolve(dbEjer);
        };

        requestDB.onerror = (event) => {
            console.error("❌ Error al abrir la base de datos:", event.target.error);
            reject(event.target.error);
        };
    });
}
