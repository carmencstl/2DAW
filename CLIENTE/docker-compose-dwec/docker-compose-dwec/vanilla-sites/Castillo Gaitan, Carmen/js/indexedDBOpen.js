"use strict";

let db;

function abrirBaseDatos() {
    return new Promise((resolve, reject) => {
        const requestDB = indexedDB.open("UsuariosIDB", 1);

        requestDB.onupgradeneeded = (event) => {
            db = event.target.result;
            if (!db.objectStoreNames.contains("usuarios")) {
                const store = db.createObjectStore("usuarios", { keyPath: "usuario" });
                store.createIndex("nombre", "nombre", { unique: false });


                const usuarioAdmin = {
                    usuario: "admin",
                    password: "admin123",
                    nombre: "Administrador",
                    isLogged: false,
                    imagen: null,
                    tipo: "admin"
                };

                store.add(usuarioAdmin);
                console.log("Usuario admin creado por primera vez.");
            }
        };

        requestDB.onsuccess = async (event) => {
            db = event.target.result;
            console.log("✅ Base de datos abierta correctamente.");

            await actualizarImagenAdmin();

            resolve(db);
        };

        requestDB.onerror = (event) => {
            console.error("❌ Error al abrir la base de datos:", event.target.error);
            reject(event.target.error);
        };
    });
}

function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("No se pudo leer el archivo"));
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

async function actualizarImagenAdmin() {
    return new Promise(async (resolve, reject) => {

        const response = await fetch('./img/iconoPorDefecto.png');
        const blob = await response.blob();
        const imagenBase64 = await fileToDataURL(blob);

        const transaction = db.transaction(["usuarios"], "readwrite");
        const store = transaction.objectStore("usuarios");
        
        const getRequest = store.get("admin");
        
        getRequest.onsuccess = () => {
            const admin = getRequest.result;
            
            if (admin && !admin.imagen) {
                admin.imagen = imagenBase64;
                store.put(admin);  
                console.log("Imagen del admin actualizada.");
            }
            resolve();
        };
        
        getRequest.onerror = () => {
            reject(getRequest.error);
        };
        
        transaction.onerror = () => {
            reject(transaction.error);
        };
    });
}
