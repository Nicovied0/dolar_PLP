import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  valorDolar: string = '';
  usuarioGanador: any = null;

  constructor(private http: HttpClient) { }

  buscarGanador() {
    if (!this.valorDolar) {
      return;
    }

    const requestBody = { valorDolar: this.valorDolar };

    this.http.post<any>('https://dolar-plp-back.vercel.app/precio', requestBody).subscribe(
      response => {
        this.usuarioGanador = response;
      },
      error => {
        console.error('Error al buscar ganador:', error);
      }
    );
  }

  editarGanador() {
    if (this.usuarioGanador) {
      this.usuarioGanador.userWinner = true;
      const updatedUser = {
        ...this.usuarioGanador,
        valorDolar: this.valorDolar
      };

      this.http.put<any>('https://dolar-plp-back.vercel.app/' + this.usuarioGanador._id, updatedUser).subscribe(
        response => {
          console.log('Usuario actualizado exitosamente:', response);
        },
        error => {
          console.error('Error al actualizar usuario:', error);
        }
      );
    }
  }

}
