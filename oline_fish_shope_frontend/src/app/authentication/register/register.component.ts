import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterUserDto } from '../../dto/register-user-dto.dto';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, 
    private router: Router ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      address: ['', Validators.required],
    });
  }

  showPassword: boolean = false;

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      const registerUserDto: RegisterUserDto = this.registerForm.value;
      this.authService.registerUser(registerUserDto).subscribe({
        next: response => {
          console.log('Registration successful:', response);
          this.snackBar.open('Registration successful!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['']);
        },
        error: error => {
          this.errorMessage = 'Registration failed. Please try again.';
          console.error('Registration error:', error);
          this.loading = false;
        }
      });
    }
  }
}
