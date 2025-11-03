import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('backgroundMusic') audioElement!: ElementRef<HTMLAudioElement>;
  
  usuario: string = '';
  password: string = '';
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

  async onSubmit(): Promise<void> {
    if (!this.usuario || !this.password) {
      this.mensaje = 'Por favor, completa todos los campos';
      return;
    }

    const result = await this.authService.login(this.usuario, this.password);
    
    if (result.success) {
      this.router.navigate(['/']);
    } else {
      this.mensaje = result.message;
    }
  }

  navegarA(ruta: string): void {
    this.router.navigate([ruta]);
  }
}
