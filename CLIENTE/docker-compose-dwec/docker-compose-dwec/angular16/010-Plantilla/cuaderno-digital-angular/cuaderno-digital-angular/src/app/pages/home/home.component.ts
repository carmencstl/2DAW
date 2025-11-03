import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MusicService } from '../../services/music.service';
import { ApiService } from '../../services/api.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('backgroundMusic') audioElement!: ElementRef<HTMLAudioElement>;
  
  currentUser: Usuario | null = null;
  currentDate: string = '';
  musicStatus: string = 'play';
  randomAdvice: string = '';
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private musicService: MusicService,
    private apiService: ApiService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.setCurrentDate();
    await this.loadUserData();
    this.loadRandomAdvice();
    
    this.authService.currentUser$.subscribe(async user => {
      this.currentUser = user;
      this.isLoggedIn = user !== null;
      this.isAdmin = await this.authService.isAdmin();
    });
  }

  ngAfterViewInit(): void {
    if (this.audioElement) {
      this.musicService.init(this.audioElement.nativeElement);
    }
  }

  private async loadUserData(): Promise<void> {
    this.currentUser = await this.authService.obtenerLoggedUser();
    this.isLoggedIn = this.currentUser !== null;
    this.isAdmin = await this.authService.isAdmin();
  }

  private setCurrentDate(): void {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const fecha = new Date();
    this.currentDate = `${fecha.getDate()} de ${meses[fecha.getMonth()]} ${fecha.getFullYear()}`;
  }

  private loadRandomAdvice(): void {
    this.apiService.getRandomAdvice().subscribe({
      next: (response) => {
        this.randomAdvice = response.slip.advice;
      },
      error: (error) => {
        console.error('Error al cargar el consejo:', error);
        this.randomAdvice = 'Be yourself; everyone else is already taken.';
      }
    });
  }

  toggleMusic(): void {
    const result = this.musicService.toggleMusic();
    this.musicStatus = result.status;
  }

  async cerrarSesion(): Promise<void> {
    await this.authService.cerrarSesion();
  }

  navegarA(ruta: string): void {
    this.router.navigate([ruta]);
  }

  abrirURL(url: string): void {
    window.open(url, '_blank');
  }
}
