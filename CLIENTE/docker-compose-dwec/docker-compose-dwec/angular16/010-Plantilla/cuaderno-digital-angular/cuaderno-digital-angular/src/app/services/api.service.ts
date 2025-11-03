import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface APIUser {
  name: {
    first: string;
    last: string;
  };
  picture: {
    thumbnail: string;
    large: string;
    medium: string;
  };
}

interface APIResponse {
  results: APIUser[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://randomuser.me/api/';

  constructor(private http: HttpClient) {}

  getRandomUser(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.apiUrl);
  }

  getRandomAdvice(): Observable<any> {
    return this.http.get('https://api.adviceslip.com/advice');
  }
}
