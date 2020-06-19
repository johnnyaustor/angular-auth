import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  user: User = new User();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initReactiveForm();
  }

  initReactiveForm() {
    this.form = this.fb.group({
      fullName: this.fb.control(''),
      username: this.fb.control(''),
      password: this.fb.control('')
    });

    this.form.get('fullName').valueChanges.subscribe(val => { this.user.fullName = val });
    this.form.get('username').valueChanges.subscribe(val => { this.user.username = val });
    this.form.get('password').valueChanges.subscribe(val => { this.user.password = val });
  }

  onFormSubmit() {
    console.log(this.user);
    this.authService.register(this.user).subscribe(
      (resp) => {
        this.router.navigate(['/login']);
      },
      err => {
        console.error(err);
      }
    )
  }

}
