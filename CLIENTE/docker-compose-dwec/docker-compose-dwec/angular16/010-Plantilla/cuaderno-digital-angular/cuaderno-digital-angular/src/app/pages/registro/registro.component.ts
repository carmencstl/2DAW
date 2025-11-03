import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MusicService } from '../../services/music.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  @ViewChild('backgroundMusic') audioElement!: ElementRef<HTMLAudioElement>;
  
  nombre: string = '';
  usuario: string = '';
  password: string = '';
  imagen: File | null = null;
  previewUrl: string = '';
  mensaje: string = '';
  currentDate: string = '';
  musicStatus: string = 'play';

  constructor(
    private authService: AuthService,
    private musicService: MusicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setCurrentDate();
  }

  ngAfterViewInit(): void {
    if (this.audioElement) {
      this.musicService.init(this.audioElement.nativeElement);
    }
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

  async onSubmit(): Promise<void> {
    if (!this.nombre || !this.usuario || !this.password) {
      this.mensaje = 'Por favor, completa todos los campos';
      return;
    }

    const nuevoUsuario: Usuario = {
      nombre: this.nombre,
      usuario: this.usuario,
      password: this.password,
      tipo: 'user',
      isLogged: false,
      imagen: this.imagen || 'assets/img/iconoPorDefecto.png'
    };

    const result = await this.authService.registro(nuevoUsuario);
    
    if (result.success) {
      this.mensaje = result.message;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    } else {
      this.mensaje = result.message;
    }
  }

  navegarA(ruta: string): void {
    this.router.navigate([ruta]);
  }
}
