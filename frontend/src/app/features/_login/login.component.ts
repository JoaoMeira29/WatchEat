import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../../_shared/services/_Auth/auth.service";
import { first } from 'rxjs/operators';
import decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string | null = null;

  loginForm = this.formBuilder.group({
    Email: '',
    Password: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService.authLogin(this.loginForm.get('Email')?.value ?? '',
      this.loginForm.get('Password')?.value ?? '')
      .pipe(first())
      .subscribe(
        (response: any) => {
          const authToken = response.body.Authorization;
          if (authToken) {
            this.authService.LogUser(authToken);
            this.errorMessage = null;
          }
        },
        (error : any)  => {
          this.errorMessage = error.error.error;
        }
      );
  }
}
