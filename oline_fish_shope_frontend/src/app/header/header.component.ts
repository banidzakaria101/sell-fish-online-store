import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Role } from '../enums/role'; // Import Role if you haven't

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

  getUserRole(): string {
    const role = this.authService.getCurrentUserRole();
    return role ? role.toString() : '';
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

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  navigateToDashboard(): void {
    const role = this.getUserRole();
    console.log(role);
    if (role === 'user') {
      this.router.navigate(['/user-dashboard']);
    } else {
      this.router.navigate(['/admin-dashboard']);
    }
  }
}
