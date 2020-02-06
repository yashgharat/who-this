import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public message = "";

  signinForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(6)])
  });

  hide = true;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSignIn() {
    this.authService.SignIn(this.signinForm.controls['email'].value,
      this.signinForm.controls['password'].value);
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.onSignIn();
    }
  }

}
