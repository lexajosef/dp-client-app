import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuard } from './_guards/auth.guard';
import { LoggedGuard } from './_guards/logged.guard';

// Components
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'login', canActivate: [LoggedGuard], component: LoginComponent },
  { path: 'registration', canActivate: [LoggedGuard], component: RegistrationComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
