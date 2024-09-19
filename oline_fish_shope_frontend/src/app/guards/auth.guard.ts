import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const _router = inject(Router);

  //Check if the user is logged in
  if (authService.isLoggedIn()){
    return true; //Allow access
  }

  // Redirect to the login page with the return URL
  _router.navigate(['']), {
    queryParam: { returnUrl: state.url}
  }
  return false;

};
