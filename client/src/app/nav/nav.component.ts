import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private router: Router) { }

  goHome(){
    this.router.navigate(['/'])
  }

  goRegister(){
    this.router.navigate(['/register'])
  }
  goParticipants(){
    this.router.navigate(['/participants'])
  }
  goWins(){
    this.router.navigate(['/winner'])
  }
}
