import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private readonly TOKEN_KEY = 'authToken'

  //Save JWT token to localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  //GET JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  //Get User Role
  getUserRole(toke: string): string | null {
    const decodedToken = this.decodeToken(this.TOKEN_KEY);
    return decodedToken?.role || null;
  }

  //Get Username from token
  getUsernameFromToken(token: string): string | null {
    const decodedToken = this.decodeToken(this.TOKEN_KEY);
    return decodedToken?.sub || null;
  }

  // Remove JWT token from localStorage
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
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
