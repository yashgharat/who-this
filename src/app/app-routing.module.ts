import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RegistrationComponent } from './login/registration/registration.component'


const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
