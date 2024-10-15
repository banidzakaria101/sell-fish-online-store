import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterUserDto } from '../../dto/register-user-dto.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Ensure 10-digit phone number
      address: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      const registerUserDto: RegisterUserDto = this.registerForm.value;
      this.authService.registerUser(registerUserDto).subscribe({
        next: response => {
          console.log('Registration successful:', response);
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
