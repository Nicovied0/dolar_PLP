import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {
  private apiUrl = 'https://dolar-plp-back.vercel.app';
  constructor(private http: HttpClient) { }

  obtenerUltimosParticipantes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`).pipe(
      map((data: any[]) => {
        data.sort((a, b) => new Date(b.fechaDeRegistro).getTime() - new Date(a.fechaDeRegistro).getTime());
        return data.slice(0, 10);
      })
    );
  }

  obtenerCantidadTotalParticipantes(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}/`).pipe(
      map((data: any[]) => data.length)
    );
  }
}
