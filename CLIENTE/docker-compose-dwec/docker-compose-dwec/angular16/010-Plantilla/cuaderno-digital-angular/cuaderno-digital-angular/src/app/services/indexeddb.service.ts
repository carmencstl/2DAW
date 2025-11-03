import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class IndexeddbService {
  private db: IDBDatabase | null = null;
  private dbName = 'UsuariosIDB';
  private storeName = 'usuarios';

  constructor() {
    this.initDB();
  }

  private initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event: any) => {
        this.db = event.target.result;
        if (!this.db!.objectStoreNames.contains(this.storeName)) {
          const store = this.db!.createObjectStore(this.storeName, { keyPath: 'usuario' });
          store.createIndex('nombre', 'nombre', { unique: false });

          const usuarioAdmin: Usuario = {
            usuario: 'admin',
            password: 'admin123',
            nombre: 'Administrador',
            isLogged: false,
            imagen: null,
            tipo: 'admin'
          };

          store.add(usuarioAdmin);
        }
      };

      request.onsuccess = async (event: any) => {
        this.db = event.target.result;
        await this.actualizarImagenAdmin();
        resolve(this.db!);
      };

      request.onerror = (event: any) => {
        reject(event.target.error);
      };
    });
  }

  private async actualizarImagenAdmin(): Promise<void> {
    try {
      const response = await fetch('./assets/img/iconoPorDefecto.png');
      const blob = await response.blob();
      const imagenBase64 = await this.fileToDataURL(blob);

      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      const getRequest = store.get('admin');
      
      getRequest.onsuccess = () => {
        const admin = getRequest.result;
        
        if (admin && !admin.imagen) {
          admin.imagen = imagenBase64;
          store.put(admin);
        }
      };
    } catch (error) {
      console.error('Error actualizando imagen admin:', error);
    }
  }

  async abrirBaseDatos(): Promise<IDBDatabase> {
    if (this.db) {
      return this.db!;
    }
    return this.initDB();
  }

  async guardarUsuario(usuario: Usuario): Promise<void> {
  await this.abrirBaseDatos();
  
  if (usuario.imagen && typeof usuario.imagen !== 'string') {
    usuario.imagen = await this.fileToDataURL(usuario.imagen as File);
  }
  
  return new Promise((resolve, reject) => {
    const transaction = this.db!.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    const request = store.put(usuario);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

  async leerUsuarios(): Promise<Usuario[]> {
    await this.abrirBaseDatos();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async borrarUsuario(usuario: string): Promise<void> {
    await this.abrirBaseDatos();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(usuario);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private fileToDataURL(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('No se pudo leer el archivo'));
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
}
