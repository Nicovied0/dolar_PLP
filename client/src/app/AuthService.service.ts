import { Injectable } from '@angular/core';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private correctPassword = environment.adminPassword;

  constructor() { }

  verificarContraseña(contraseña: string): boolean {
    return contraseña === this.correctPassword;
  }
}
