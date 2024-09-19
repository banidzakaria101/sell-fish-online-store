import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from "./jwt.service";
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginUserDto } from '../dto/login-user-dto.dto';
import { Role } from '../enums/role';
import { RegisterUserDto } from '../dto/register-user-dto.dto';
import { LoginResponse } from '../dto/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '//localhost:8088/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(this.decodeToken(this.jwtService.getToken()));

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) {}

  //Register user (Customer)
  registerUser(customerDto: RegisterUserDto): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/sing-up`, customerDto);
  }

  // Add Admin
  addAdmin(adminDTO: RegisterUserDto): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add-admin`, adminDTO);
  }

  // Authenticate (Login)
  authenticate(loginUserDto: LoginUserDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginUserDto).pipe(
      tap((LoginResponse: LoginResponse) => {
        if(LoginResponse) {
          this.jwtService.saveToken(LoginResponse.token);
          this.currentUserSubject.next(this.decodeToken(LoginResponse.token));
        } else {
          console.error('No login response received');
        }
      })
    );
  }

  //Logout
  logout(): void {
    this.jwtService.removeToken();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  //Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  //Check if user has specific role
  hasRole(role: Role): boolean {
    const currentUserRole = this.getCurrentUserRole();
    return currentUserRole === role;
  }

  //Get the current user's role
  getCurrentUserRole(): Role | null {
    const token = this.jwtService.getToken();
    if (token) {
      return this.jwtService.getUserRole(token) as Role || null;
    }
    return null;
  }

  //Decode token
  private decodeToken(token: string | null): any {
    if (token) {
      return this.jwtService.decodeToken(token);
    }
    return null;
  }
}
