import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public registroCerrado: boolean = false;
  public userRegister: boolean = false
  public validates: boolean = false;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    const fechaObjetivo = new Date("2023-08-12T00:00:00");
    const fechaActual = new Date();
    if (fechaActual >= fechaObjetivo) {
      this.registroCerrado = true;
    }
    const localStorageData = localStorage.getItem('userRegisterDolar');
    if (localStorageData !== null) {
      const parsedData = JSON.parse(localStorageData).userRegister;
      if (parsedData) {
        this.userRegister = true
      }
    }

  }

  async verificarExistencia(email: string, dni: string): Promise<boolean> {
    const url = `https://dolar-plp-back.vercel.app/`;
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
      const email = this.emailControl.value;
      const dni = this.dniControl.value;



      try {
        const existeRegistro = await this.verificarExistencia(email, dni);
        if (existeRegistro) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Tu email o tu dni ya fue registrado',
            showConfirmButton: false,
            timer: 1000
          })
          return;
        }
        this.validates = true;
        const nuevoUsuario = {
          dni: dni,
          nombre: this.nombreControl.value,
          email: email,
          fechaNacimiento: this.fechaNacimientoControl.value,
          valorDolar: this.usdControl.value,
          telefono: this.telefonoControl.value,
          userRegister: true
        };

        console.log('Enviando datos:', nuevoUsuario);

        this.http.post<any>('https://dolar-plp-back.vercel.app/', nuevoUsuario).subscribe(
          response => {
            localStorage.setItem('userRegisterDolar', JSON.stringify(nuevoUsuario));
            console.log('Usuario registrado exitosamente:', response);
            Swal.fire('Registro Exitoso', '¡El usuario ha sido registrado exitosamente!', 'success');
          },
          error => {
            Swal.fire('Error al registrarte', 'No se a podido registrar correctamente', 'error')
          }
        );
      } catch (error) {
        console.error('Error al verificar existencia:', error);
      }
    } else {
      console.log('Formulario no válido');
    }
  }



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
    Validators.pattern(/^\d{1,5}(\.\d{1,2})?$/)
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
