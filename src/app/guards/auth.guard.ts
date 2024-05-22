import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const matSnackbar = inject(MatSnackBar)
  const authService = inject(AuthService);
  const userLogged = authService.isLoggedIn();

  if (userLogged) return true

  matSnackbar.open('You must be logged in to view this page', 'Ok', {
    duration: 3000,
  });
  inject(Router).navigate(['/']);
  return false
};
