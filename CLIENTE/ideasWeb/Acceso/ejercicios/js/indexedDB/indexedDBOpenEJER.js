"use strict";

let db;

function abrirBaseDatos() {
    return new Promise((resolve, reject) => {
        const requestDB = indexedDB.open("UsuariosIDBejer", 1);

        requestDB.onupgradeneeded = (event) => {
            db = event.target.result;
            if (!db.objectStoreNames.contains("usuariosEjer")) {
                const store = db.createObjectStore("usuariosEjer", { keyPath: "usuario" });
                store.createIndex("nombre", "nombre", { unique: false });
            }
        };

        requestDB.onsuccess = (event) => {
            db = event.target.result;
            console.log("✅ Base de datos abierta correctamente.");
            resolve(db);
        };

        requestDB.onerror = (event) => {
            console.error("❌ Error al abrir la base de datos:", event.target.error);
            reject(event.target.error);
        };
    });
}
