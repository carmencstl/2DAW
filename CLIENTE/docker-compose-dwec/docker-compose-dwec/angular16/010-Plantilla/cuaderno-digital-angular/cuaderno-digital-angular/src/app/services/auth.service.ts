import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IndexeddbService } from './indexeddb.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$: Observable<Usuario | null> = this.currentUserSubject.asObservable();

  constructor(
    private indexeddbService: IndexeddbService,
    private router: Router
  ) {
    this.loadCurrentUser();
  }

  private async loadCurrentUser(): Promise<void> {
    const user = await this.obtenerLoggedUser();
    this.currentUserSubject.next(user);
  }

  async credencialCorrecta(username: string, password: string): Promise<boolean> {
    const usuarios = await this.indexeddbService.leerUsuarios();
    return usuarios.some(usuario => 
      usuario.usuario === username && usuario.password === password
    );
  }

  async obtenerLoggedUser(): Promise<Usuario | null> {
    const usuarios = await this.indexeddbService.leerUsuarios();
    const loggedUser = usuarios.find(usuario => usuario.isLogged === true);
    return loggedUser || null;
  }

  async login(username: string, password: string): Promise<{ success: boolean; message: string }> {
    const isValid = await this.credencialCorrecta(username, password);
    
    if (!isValid) {
      return { success: false, message: 'Usuario o contraseña incorrectos' };
    }

    const usuarios = await this.indexeddbService.leerUsuarios();
    const usuario = usuarios.find(u => u.usuario === username);
    
    if (usuario) {
      usuario.isLogged = true;
      await this.indexeddbService.guardarUsuario(usuario);
      this.currentUserSubject.next(usuario);
      return { success: true, message: 'Login exitoso' };
    }

    return { success: false, message: 'Error al iniciar sesión' };
  }

  async registro(usuario: Usuario): Promise<{ success: boolean; message: string }> {
    try {
      const usuarios = await this.indexeddbService.leerUsuarios();
      const existe = usuarios.some(u => u.usuario === usuario.usuario);
      
      if (existe) {
        return { success: false, message: 'El usuario ya existe' };
      }

      usuario.isLogged = false;
      usuario.tipo = 'user';
      await this.indexeddbService.guardarUsuario(usuario);
      return { success: true, message: 'Usuario registrado exitosamente' };
    } catch (error) {
      return { success: false, message: 'Error al registrar usuario' };
    }
  }

  async cerrarSesion(): Promise<void> {
    const usuarios = await this.indexeddbService.leerUsuarios();
    
    for (const user of usuarios) {
      if (user.isLogged) {
        user.isLogged = false;
        await this.indexeddbService.guardarUsuario(user);
      }
    }
    
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  async isAdmin(): Promise<boolean> {
    const user = await this.obtenerLoggedUser();
    return user?.tipo === 'admin';
  }

  async isLoggedIn(): Promise<boolean> {
    const user = await this.obtenerLoggedUser();
    return user !== null;
  }
}
