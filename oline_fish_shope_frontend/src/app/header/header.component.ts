import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartItemCount: number = 0;

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItemCount = items.length;
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUserName(): string {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? currentUser.username : '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  signUp(): void {
    this.router.navigate(['/sign-up']);
  }
}
