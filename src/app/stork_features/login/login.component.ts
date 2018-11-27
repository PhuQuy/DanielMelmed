import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginValidationService } from "app/stork_features/login/loginvalidation.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  email: string
  password: string
  loginerrormsg: string
  form: FormGroup;
  constructor(private loginService: LoginService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, LoginValidationService.emailValidator])],
      password: ['', Validators.required],
    });
  }
  userLogin() {
    this.loginerrormsg = "";
    this.loginService.userLogin(this.form.value.email, this.form.value.password).subscribe(data => {
      if (data.ResponseDetails.ResponseStatus == '10') {
        localStorage.setItem('currentUser', JSON.stringify(data.ResponseMessage.user));
        this.loginerrormsg = ""; data
        this.router.navigateByUrl("/appointments");
      }
      else {
        this.loginerrormsg = data.ResponseMessage;
        this.router.navigateByUrl("/login");
      }
    })
  }
}
