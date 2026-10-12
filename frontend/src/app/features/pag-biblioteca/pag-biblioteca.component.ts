import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {BibliotecaDataService} from "../../_shared/services/Bibliotecas/biblioteca-data.service";
import decode from "jwt-decode";
import {ConteudosDataService} from "../../_shared/services/Conteudos/conteudos-data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-biblioteca',
  templateUrl: './pag-biblioteca.component.html',
  styleUrls: ['./pag-biblioteca.component.css']
})
export class PagBibliotecaComponent {
  conteudos: any[] = [];
  modalConteudo: any[] = [];
  @ViewChild('staticModal') staticModal: any; // Reference to the modal element

  contInBibliotecaForm = this.formBuilder.group({
    Estado: '',
    Rating: ['', [Validators.pattern(/^(?:10|\b[0-9]\b)$/)]],
    Review: ''
  });

  constructor(
    private bibliotecaDataService: BibliotecaDataService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.bibliotecaDataService.getBibliotecaById(tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.conteudos = data as any[]; // Cast the data to an array type
    });
  }

  onSubmit(contId : bigint) {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;
    this.bibliotecaDataService.updateConteudoInBiblioteca(this.contInBibliotecaForm, tokenPayload.user[0].Id, contId).subscribe();
    setTimeout(() => {
      this.closeModal()
      window.location.reload();
    }, 50);
  }

  openModal(conteudoId : number) {
    this.staticModal.nativeElement.classList.remove('hidden');
    this.staticModal.nativeElement.classList.add('flex');

    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;
    const cId : string = conteudoId.toString();
    this.bibliotecaDataService.getConteudoInBiblioteca(tokenPayload.user[0].Id, cId).subscribe((data: Object) => {
      this.modalConteudo = data as any[]; // Cast the data to an array type

      this.contInBibliotecaForm.patchValue({
        Estado: this.modalConteudo[0].Estado,
        Rating: this.modalConteudo[0].Rating,
        Review: this.modalConteudo[0].Review
      });
    });
  }

  closeModal() {
    this.staticModal.nativeElement.classList.remove('flex');
    this.staticModal.nativeElement.classList.add('hidden');

    this.contInBibliotecaForm.get('Rating')?.setValue('');
    this.contInBibliotecaForm.get('Rating')?.reset();
  }

}
