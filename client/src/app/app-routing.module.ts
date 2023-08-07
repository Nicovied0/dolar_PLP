import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ParticipantsComponent } from './participants/participants.component';
import { WinnerComponent } from './winner/winner.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './AuthGuard.service';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'winner', component: WinnerComponent },
  { path: 'participants', component: ParticipantsComponent },
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
