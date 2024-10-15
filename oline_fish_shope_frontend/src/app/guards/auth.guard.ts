import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Role } from '../enums/role';

export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const role = authService.getCurrentUserRole();
    if (role === Role.ADMIN) {
      return true;
    } else {
      router.navigate(['/user-dashboard']);
      return false;
    }
  }

  // Redirect to the login page with the return URL if not logged in
  router.navigate([''], { queryParams: { returnUrl: state.url }});
  return false;
};
