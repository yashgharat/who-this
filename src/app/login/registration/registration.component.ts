import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.min(6)]),
    phone: new FormControl('', [Validators.required])
  });

  constructor(
      public authService: AuthService
  ) { }

  ngOnInit() {
  }

  signUp() {

      let first_name = this.registrationForm.controls['first_name'];
      let last_name = this.registrationForm.controls['last_name'];
      let email = this.registrationForm.controls['email'];
      let number = this.registrationForm.controls['phone'];
      this.authService.SignUp(userEmail.value, userPassword.value)
  }

}
