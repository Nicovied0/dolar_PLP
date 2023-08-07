import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ParticipantsComponent } from './participants/participants.component';
import { WinnerComponent } from './winner/winner.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'winner', component: WinnerComponent },
  { path: 'participants', component: ParticipantsComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
