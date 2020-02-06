import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from "../../shared/services/auth.service";
import { RequestHelperService } from '../../shared/services/request-helper.service'
import { updateUser } from '../../shared/services/user'
import { Observable } from 'rxjs/Observable';


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
    public authService: AuthService,
    public client: RequestHelperService
  ) { }

  ngOnInit() {
  }

  signUp() {

    let varfirst_name = this.registrationForm.controls['first_name'].value;
    let varlast_name = this.registrationForm.controls['last_name'].value;
    let varemail = this.registrationForm.controls['email'].value;
    let varnumber = this.registrationForm.controls['phone'].value;
    let varpassword = this.registrationForm.controls['password'].value;
    this.authService.SignUp(varemail, varpassword);

      (async () => {
        // Do something before delay
        console.log('before delay')
        await this.delay(2000);
        const newUser: updateUser = {
          "uid": this.authService.getCurrentUser(),
          "email": varemail,
          "first_name": varfirst_name,
          "last_name": varlast_name,
          "number": varnumber
        };
        this.client.updateUser(newUser)
          .subscribe(
            (data) => {
              console.log(data);
            });
      })();

  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
