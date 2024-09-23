import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  //Check if the user is logged in
  if (authService.isLoggedIn()){
    return true; //Allow access
  }

  // Redirect to the login page with the return URL
  router.navigate([''], { queryParams: { returnUrl: state.url}});
  return false;

};
