import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../../_shared/services/_Auth/auth.service";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form!: FormGroup;
  errorMessage: string | null = null;

  registerForm = this.formBuilder.group({
    Email: '',
    Password: '',
    confirm_password: ''
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
      Password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService.authRegister(this.registerForm.get('Email')?.value ?? '',
      this.registerForm.get('Password')?.value ?? '',
     this.registerForm.get('confirm_password')?.value ?? '')
      .pipe(first())
      .subscribe(
        (response: any) => {
          const authToken = response.body.Authorization;
          if (authToken) {
            this.authService.LogUser(authToken);
          }
          else {
            console.log("fudeu gerau");
          }
        },
        (error : any)  => {
          this.errorMessage = error.error.error;
        }
      );
  }
}
