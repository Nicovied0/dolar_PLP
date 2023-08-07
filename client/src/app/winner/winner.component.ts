import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {
  ganador: any; 

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.obtenerGanador();
  }

  obtenerGanador() {
    this.http.get<any[]>('https://dolar-plp-back.vercel.app/').subscribe(
      response => {
        const ganadores = response.filter(usuario => usuario.userWinner === true);
        if (ganadores.length > 0) {
          this.ganador = ganadores[0];
        }
      },
      error => {
        console.error('Error al obtener el ganador:', error);
      }
    );
  }

}
