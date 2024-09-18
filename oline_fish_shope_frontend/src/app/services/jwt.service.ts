import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  decodeToken(token: string): any {
    return jwtDecode(token);
  }

  getUserRole(token: string): string | null {
    const decodedToken = this.decodeToken(token);
    return decodedToken?.role || null;
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getUsernameFromToken(token: string): string | null {
    const decodedToken = this.decodeToken(token);
    return decodedToken?.sub || null;
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
