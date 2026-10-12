import { Component } from '@angular/core';
import decode from "jwt-decode";
import {UtilizadoresDataService} from "../../_shared/services/Utilizadores/utilizadores-data.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../_shared/services/_Auth/auth.service";

@Component({
  selector: 'app-pag-edit-perfil',
  templateUrl: './pag-edit-perfil.component.html',
  styleUrls: ['./pag-edit-perfil.component.css']
})
export class PagEditPerfilComponent {
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
    private utilizadoresDataService: UtilizadoresDataService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;
    this.currentUser = tokenPayload.user[0].Id;

    this.utilizadoresDataService.getUtilizadorById(tokenPayload.user[0].Id).subscribe((data: Object) => {
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
    this.utilizadoresDataService.updateUtilizador(tokenPayload.user[0].Id, this.updateUtilizadorForm).subscribe((data: Object) => {
      this.user = data as any[]; // Cast the data to an array type
    });
    setTimeout(() => {
      this.router.navigate(['/perfil', this.currentUser]);
    }, 250);
  }
}
