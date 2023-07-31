import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registroCerrado: boolean = false;

  ngOnInit() {
    // Fecha objetivo (12 de agosto)
    const fechaObjetivo = new Date("2023-08-12T00:00:00");
    const fechaActual = new Date();

    // Si la fecha actual es mayor o igual a la fecha objetivo, se ha pasado la fecha de registro
    if (fechaActual >= fechaObjetivo) {
      this.registroCerrado = true;
    }
  }
}
