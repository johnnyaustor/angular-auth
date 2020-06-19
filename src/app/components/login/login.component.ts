import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginReq: Login = new Login();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initReactiveForm();
  }

  initReactiveForm() {
    this.form = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control('')
    })

    this.form.get('username').valueChanges.subscribe(val => { this.loginReq.username = val });
    this.form.get('password').valueChanges.subscribe(val => { this.loginReq.password = val });
  }

  onFormSubmit() {
    console.log(this.loginReq);
    this.authService.login(this.loginReq).subscribe(
      (resp: any) => {
        console.log(resp);
        this.authService.storeToken(resp.token);
        let returnUrl = this.activatedroute.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
      },
      err => {
        console.error(err);
      }
    )
  }

}
