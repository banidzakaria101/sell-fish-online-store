import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Role } from '../enums/role';

export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is logged in
  if (authService.isLoggedIn()) {
    // Check if the user has admin role
    const role = authService.getCurrentUserRole();
    if (role === Role.ADMIN) {
      return true; // Allow access to admin dashboard
    } else {
      // Redirect to user dashboard or home page if not admin
      router.navigate(['/user-dashboard']); // Change this to your desired redirect
      return false;
    }
  }

  // Redirect to the login page with the return URL if not logged in
  router.navigate([''], { queryParams: { returnUrl: state.url }});
  return false;
};
