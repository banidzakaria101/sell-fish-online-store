import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginUserDto } from '../dto/login-user-dto.dto';
import { Role } from '../enums/role';
import { RegisterUserDto } from '../dto/register-user-dto.dto';
import { LoginResponse } from '../dto/login-response.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `http://localhost:8088/api/auth`;
  private currentUserSubject: BehaviorSubject<any>;

  currentUser$: Observable<any>;

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) {
    const decodedToken = this.decodeToken(this.jwtService.getToken());
    this.currentUserSubject = new BehaviorSubject<any>(decodedToken);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // Register user (Customer)
  registerUser(customerDto: RegisterUserDto): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/sign-up`, customerDto);
  }

  // Add Admin
  addAdmin(adminDTO: RegisterUserDto): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add-admin`, adminDTO);
  }

  // Authenticate (Login)
  authenticate(loginUserDto: LoginUserDto): Observable<LoginResponse> {
    // Log the data just before it's sent to the backend
    console.log('Data sent to backend from AuthService:', loginUserDto);
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginUserDto).pipe(
      tap((loginResponse: LoginResponse) => {
        if (loginResponse) {
          this.jwtService.saveToken(loginResponse.token);
          this.currentUserSubject.next(this.decodeToken(loginResponse.token));
        } else {
          console.error('No login response received');
        }
      })
    );
  }

  // Logout
  logout(): void {
    this.jwtService.removeToken();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  // Check if the user has a specific role
  hasRole(role: Role): boolean {
    const currentUserRole = this.getCurrentUserRole();
    return currentUserRole === role;
  }

  // Get the current user's role
  getCurrentUserRole(): Role | null {
    const token = this.jwtService.getToken();
    if (token) {
      return this.jwtService.getUserRole(token) as Role || null;
    }
    return null;
  }

  // Decode token
  private decodeToken(token: string | null): any {
    if (token) {
      return this.jwtService.decodeToken(token);
    }
    return null;
  }
}
