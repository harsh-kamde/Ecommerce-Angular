import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Signal } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated: Signal<boolean> = authService.isLoggedIn;
  console.log("isAuthenticated",authService.isLoggedIn());
  console.log("isloggedIn: ", authService.checkLoginStatus());
  if (!isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};