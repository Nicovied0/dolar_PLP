import { Component, OnInit } from '@angular/core';

import { ParticipantsService } from '../participants.service';
@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {
  ultimosParticipantes: any[] = [];
  cantidadTotalParticipantes: number = 0;

  constructor(private participantesService: ParticipantsService) { }

  ngOnInit() {
    this.obtenerUltimosParticipantes();
    this.obtenerCantidadTotalParticipantes();
  }

  obtenerUltimosParticipantes() {
    this.participantesService.obtenerUltimosParticipantes().subscribe(
      (data: any[]) => {
        this.ultimosParticipantes = data;
        console.log(data)
      },
      error => {
        console.error('Error al obtener los últimos participantes:', error);
      }
    );
  }

  obtenerCantidadTotalParticipantes() {
    this.participantesService.obtenerCantidadTotalParticipantes().subscribe(
      (value: number) => {
        this.cantidadTotalParticipantes = value;
      },
      error => {
        console.error('Error al obtener la cantidad total de participantes:', error);
      }
    );
  }
}
