import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ParticipantsComponent } from './participants/participants.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'winner', component: RegisterComponent },
  { path: 'participants', component: ParticipantsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
