import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';
import { LoginUserDto } from '../../dto/login-user-dto.dto';
import { LoginResponse } from '../../dto/login-response.model';
import { Role } from '../../enums/role';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  showPassword: boolean = false;
  errorMessage: string | null = null;
  options: AnimationOptions = {
    path: 'https://lottie.host/88b29e79-248d-476e-91a9-903aa656b978/tEQDpBICdZ.json',
    autoplay: true,
    loop: true
  };
 
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService
  ) {
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

    this.loading = true;
    this.errorMessage = null;
    
    const formValues = this.loginForm.value;
    const loginUser: LoginUserDto = {
      usernameOrEmail: formValues.usernameOrEmail,
      password: formValues.password
    };

    console.log('Data sent to backend:', loginUser);
    
    this.authService.authenticate(loginUser).subscribe({
      next: (response: LoginResponse) => {
        this.handleLoginSuccess(response);
        this.loading = false;
      },
      error: (err) => {
        this.handleLoginError(err);
        this.loading = false;
      },
      complete: () => {
        console.log('Login process complete');
        this.loading = false;
      }
    });
  }

  private handleLoginSuccess(response: LoginResponse) {
    console.log('Login successful:', response);
    const token = response?.token;
    if (!token) {
      this.errorMessage = 'No token found in the response!';
      console.error(this.errorMessage);
      return;
    }
    console.log('Token expires in: ', response.expiresIn);
    try {
      const role: string | null = this.jwtService.getUserRole(token);
      this.redirectUserByRole(role);
    } catch (error) {
      this.errorMessage = 'Error processing login response';
      console.error('Token decoding fails:', error);
    }
  }

  private handleLoginError(error: any) {
    this.errorMessage = 'Login failed. Please check your credentials and try again.';
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
        this.errorMessage = 'Unknown user role';
        console.error('Unknown role:', role);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}