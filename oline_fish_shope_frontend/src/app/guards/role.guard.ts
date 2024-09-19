import { CanActivateFn, Router } from '@angular/router';
import { Role } from '../enums/role';
import { state } from '@angular/animations';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const roleGuard = (allowedRoles: Role[]):  CanActivateFn =>  {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if(!authService.isLoggedIn()) {
      router.navigate(['/login'], { queryParams: { returnUrl: state.url}} );
        return false;
    }

    if (allowedRoles.some(role => authService.hasRole(role))) {
      return true;
    }

    router.navigate(['/unauthorized']);
    return false;
  };
};
