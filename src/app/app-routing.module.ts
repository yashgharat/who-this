import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RegistrationComponent } from './login/registration/registration.component'
import { VerificationComponent } from './login/verification/verification.component'


const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent},
    { path: 'verification', component: VerificationComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
