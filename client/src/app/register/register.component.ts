import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public registroCerrado: boolean = false;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    const fechaObjetivo = new Date("2023-08-12T00:00:00");
    const fechaActual = new Date();
    if (fechaActual >= fechaObjetivo) {
      this.registroCerrado = true;
    }
  }

  async verificarExistencia(email: string, dni: string): Promise<boolean> {
    const url = `http://localhost:3001/`;
    try {
      const usuarios: any[] | undefined = await this.http.get<any[]>(url).toPromise();
      if (usuarios === undefined) {
        console.error('La respuesta de la API es undefined');
        return false;
      }
      return usuarios.some(usuario => usuario.email === email || usuario.dni === dni);
    } catch (error) {
      console.error('Error al verificar existencia:', error);
      return false;
    }
  }


  async registrarUsuario(registroForm: NgForm) {
    console.log('Método registrarUsuario() ejecutado');
    if (registroForm.valid) {
      const email = registroForm.value.email;
      const dni = registroForm.value.dni;

      try {
        const existeRegistro = await this.verificarExistencia(email, dni);
        if (existeRegistro) {
          console.log('El email o DNI ya está registrado');
          return;
        }


        const nuevoUsuario = {
          dni: dni,
          nombre: registroForm.value.nombre,
          email: email,
          fechaNacimiento: registroForm.value.fecha_nacimiento,
          valorDolar: registroForm.value.dolar,
          telefono: registroForm.value.telefono
        };

        console.log('Enviando datos:', nuevoUsuario);

        this.http.post<any>('http://localhost:3001/', nuevoUsuario).subscribe(
          response => {
            console.log('Usuario registrado exitosamente:', response);
          },
          error => {
            console.error('Error al registrar el usuario:', error);
          }
        );
      } catch (error) {
        console.error('Error al verificar existencia:', error);
      }
    } else {
      console.log('Formulario no válido');
    }
  }


  // validaciones de forms
  nombreControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]{6,}$')
  ]);
  dniControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{8}$')
  ]);
  emailControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
  ]);
  telefonoControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$')
  ]);
  fechaNacimientoControl: FormControl = new FormControl('', [
    Validators.required
  ]);
  usdControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{8}$')
  ]);

  getFechaMinima(): string {
    const fechaMinima = new Date();
    fechaMinima.setFullYear(fechaMinima.getFullYear() - 18);
    return this.formatDate(fechaMinima);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
