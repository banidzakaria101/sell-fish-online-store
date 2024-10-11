import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';
import { LoginUserDto } from '../../dto/login-user-dto.dto';
import { LoginResponse } from '../../dto/login-response.model';
import { Role } from '../../enums/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService
  ) {
    // Adjusted form control name
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (!this.loginForm.valid) {
      console.error('Form is not valid.');
      return;
    }

    const formValues = this.loginForm.value;
    const loginUser: LoginUserDto = {
      usernameOrEmail: formValues.usernameOrEmail, 
      password: formValues.password
    };

    // Log the data that will be sent to the backend
    console.log('Data sent to backend:', loginUser);

    this.authService.authenticate(loginUser).subscribe({
      next: (response: LoginResponse) => this.handleLoginSuccess(response),
      error: (err) => this.handleLoginError(err),
      complete: () => console.log('Login process complete')
    });
  }

  private handleLoginSuccess(response: LoginResponse) {
    console.log('Login successful:', response);

    const token = response?.token;
    if (!token) {
      console.error('No token found in the response!');
      return;
    }

    console.log('Token expires in: ', response.expiresIn);

    try {
      const role: string | null = this.jwtService.getUserRole(token);
      this.redirectUserByRole(role);
    } catch (error) {
      console.error('Token decoding fails:', error);
    }
  }

  private handleLoginError(error: any) {
    console.error('Login failed:', error);
  }

  private redirectUserByRole(role: string | null) {
    switch (role) {
      case Role.ADMIN.toString():
        this.router.navigate(['/admin-dashboard']);
        break;
      case Role.CUSTOMER.toString():
        this.router.navigate(['/user-dashboard']);
        break;
      default:
        console.error('Unknown role:', role);
    }
  }
}
