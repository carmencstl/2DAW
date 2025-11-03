export interface Usuario {
  usuario: string;
  password: string;
  nombre: string;
  tipo: 'admin' | 'user';
  isLogged: boolean | string;
  imagen: string | File | null;
}
