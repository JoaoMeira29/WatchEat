import { Component } from '@angular/core';
import decode from "jwt-decode";
import {UsersDataService} from "../../shared/services/users/users-data.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  user: any[] = [];
  currentUser : number = -1;
  updateUtilizadorForm = this.formBuilder.group({
    Nome: '',
    Apelido: '',
    NTelemovel: '',
    Morada: '',
    NIF: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private usersDataService: UsersDataService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;
    this.currentUser = tokenPayload.user[0].Id;

    this.usersDataService.getUserById(tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.user = data as any[]; // Cast the data to an array type

      this.updateUtilizadorForm.patchValue({
        Nome: this.user[0].Nome,
        Apelido: this.user[0].Apelido,
        NTelemovel: this.user[0].NTelemovel,
        Morada: this.user[0].Morada,
        NIF: this.user[0].NIF
      });
    });

  }

  onSubmit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;
    this.usersDataService.updateUser(tokenPayload.user[0].Id, this.updateUtilizadorForm).subscribe((data: Object) => {
      this.user = data as any[]; // Cast the data to an array type
    });
    setTimeout(() => {
      this.router.navigate(['/profile', this.currentUser]);
    }, 250);
  }
}
