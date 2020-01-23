import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component'
import { RegistrationComponent } from './login/registration/registration.component'
import { VerificationComponent } from './login/verification/verification.component'
import { HomeComponent } from './home/home.component'
import { AuthGuard } from "./shared/guard/auth.guard";



const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent},
    { path: 'verification', component: VerificationComponent},
    { path: 'home', component: HomeComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
