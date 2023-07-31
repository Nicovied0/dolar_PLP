import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit() {
    // Obtener el elemento del contador desde el DOM
    const contadorElemento = document.getElementById("contador")!;

    if (contadorElemento) {
      // Fecha objetivo (12 de agosto)
      const fechaObjetivo = new Date("2023-08-12T00:00:00");

      function actualizarContador() {
        // Obtener la fecha y hora actual
        const fechaActual = new Date();

        // Calcular el tiempo restante en milisegundos
        const tiempoRestante = fechaObjetivo.getTime() - fechaActual.getTime();

        // Si el tiempo restante es menor o igual a cero, mostrar mensaje y detener el contador
        if (tiempoRestante <= 0) {
          contadorElemento.innerHTML = `El plazo para registrarte para la timba ha finalizado.`;
        } else {
          // Calcular días, horas, minutos y segundos restantes
          const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
          const horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
          const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

          // Actualizar el contenido del contador en el DOM
          contadorElemento.innerHTML = `Quedan ${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos para poder participar en la timba.`;

          // Actualizar el contador cada segundo
          setTimeout(actualizarContador, 1000);
        }
      }

      // Iniciar el contador
      actualizarContador();
    }
  }
}
