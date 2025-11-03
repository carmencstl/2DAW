import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IndexeddbService } from '../../services/indexeddb.service';
import { MusicService } from '../../services/music.service';
import { ApiService } from '../../services/api.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  @ViewChild('backgroundMusic') audioElement!: ElementRef<HTMLAudioElement>;
  
  currentUser: Usuario | null = null;
  usuarios: Usuario[] = [];
  
  nombre: string = '';
  usuario: string = '';
  password: string = '';
  rol: string = '';
  imagen: File | null = null;
  previewUrl: string = 'assets/img/iconoPorDefecto.png';
  
  usuarioOriginal: string = '';
  isLoggedOriginal: boolean | string = false;
  
  mensaje: string = '';
  currentDate: string = '';
  musicStatus: string = 'play';

  constructor(
    private authService: AuthService,
    private indexeddbService: IndexeddbService,
    private musicService: MusicService,
    private apiService: ApiService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.setCurrentDate();
    await this.loadUserData();
    await this.cargarUsuarios();
  }

  ngAfterViewInit(): void {
    if (this.audioElement) {
      this.musicService.init(this.audioElement.nativeElement);
    }
  }

  private async loadUserData(): Promise<void> {
    this.currentUser = await this.authService.obtenerLoggedUser();
  }

  private setCurrentDate(): void {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const fecha = new Date();
    this.currentDate = `${fecha.getDate()} de ${meses[fecha.getMonth()]} ${fecha.getFullYear()}`;
  }

  toggleMusic(): void {
    const result = this.musicService.toggleMusic();
    this.musicStatus = result.status;
  }

  async cargarUsuarios(): Promise<void> {
    this.usuarios = await this.indexeddbService.leerUsuarios();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imagen = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async guardar(): Promise<void> {
    if (!this.nombre || !this.usuario || !this.password || !this.rol) {
      this.mensaje = 'Por favor, completa todos los campos';
      return;
    }

    const nuevoUsuario: Usuario = {
      nombre: this.nombre,
      usuario: this.usuario,
      password: this.password,
      tipo: this.rol as 'admin' | 'user',
      isLogged: this.isLoggedOriginal,
      imagen: this.imagen || this.previewUrl
    };

    try {
      if (this.usuarioOriginal && this.usuarioOriginal !== this.usuario) {
        await this.indexeddbService.borrarUsuario(this.usuarioOriginal);
      }
      
      await this.indexeddbService.guardarUsuario(nuevoUsuario);
      this.mensaje = 'Usuario guardado correctamente';
      await this.cargarUsuarios();
      this.limpiar();
    } catch (error) {
      this.mensaje = 'Error al guardar el usuario';
    }
  }

  async guardarUsuarioAPI(): Promise<void> {
    this.apiService.getRandomUser().subscribe({
      next: async (response) => {
        const dataUser = response.results[0];
        
        const nuevoUsuario: Usuario = {
          nombre: dataUser.name.first,
          usuario: (dataUser.name.first.substring(0, 2) + dataUser.name.last.substring(0, 2)).toLowerCase(),
          password: 'dejameya',
          tipo: 'user',
          isLogged: false,
          imagen: dataUser.picture.thumbnail
        };

        try {
          await this.indexeddbService.guardarUsuario(nuevoUsuario);
          this.mensaje = 'Usuario de API guardado correctamente';
          await this.cargarUsuarios();
        } catch (error) {
          this.mensaje = 'Error al guardar el usuario de API';
        }
      },
      error: (error) => {
        this.mensaje = 'Error al obtener usuario de API';
      }
    });
  }

  editarUsuario(usuario: Usuario): void {
    this.nombre = usuario.nombre;
    this.usuario = usuario.usuario;
    this.password = usuario.password;
    this.rol = usuario.tipo;
    this.previewUrl = usuario.imagen as string;
    this.usuarioOriginal = usuario.usuario;
    this.isLoggedOriginal = usuario.isLogged;
  }

  async eliminarUsuario(usuario: string): Promise<void> {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await this.indexeddbService.borrarUsuario(usuario);
        this.mensaje = 'Usuario eliminado correctamente';
        await this.cargarUsuarios();
      } catch (error) {
        this.mensaje = 'Error al eliminar el usuario';
      }
    }
  }

  limpiar(): void {
    this.nombre = '';
    this.usuario = '';
    this.password = '';
    this.rol = '';
    this.imagen = null;
    this.previewUrl = 'assets/img/iconoPorDefecto.png';
    this.usuarioOriginal = '';
    this.isLoggedOriginal = false;
  }

  async cerrarSesion(): Promise<void> {
    await this.authService.cerrarSesion();
  }

  navegarA(ruta: string): void {
    this.router.navigate([ruta]);
  }
}
