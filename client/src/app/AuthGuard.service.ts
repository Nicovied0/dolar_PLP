import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './AuthService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const contraseñaIngresada = prompt('Ingrese la contraseña:');

    if (contraseñaIngresada && this.authService.verificarContraseña(contraseñaIngresada)) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
