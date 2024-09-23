import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class JwtService {


  //Save JWT token to localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  //GET JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token')
  }

  //Get User Role
  getUserRole(token: string): string | null {
    const decodedToken = this.decodeToken(token);
    return decodedToken?.role || null;
  }

  //Get Username from token
  getUsernameFromToken(token: string): string | null {
    const decodedToken = this.decodeToken(token);
    return decodedToken?.sub || null;
  }

  // Remove JWT token from localStorage
  removeToken(): void {
    localStorage.removeItem('token');
  }

  //Decode token
  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null
    }
  }
}

;
