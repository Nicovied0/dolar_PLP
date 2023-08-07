import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit() {
    const contadorElemento = document.getElementById("contador")!;

    if (contadorElemento) {
      const fechaObjetivo = new Date("2023-08-12T00:00:00");

      function actualizarContador() {
        const fechaActual = new Date();

        const tiempoRestante = fechaObjetivo.getTime() - fechaActual.getTime();

        if (tiempoRestante <= 0) {
          contadorElemento.innerHTML = `El plazo para registrarte para la timba ha finalizado.`;
        } else {
          const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
          const horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
          const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

          contadorElemento.innerHTML = `Quedan ${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos para poder participar en la timba.`;

          setTimeout(actualizarContador, 1000);
        }
      }

      // Iniciar el contador
      actualizarContador();
    }
  }
}
