import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {LibraryDataService} from "../../shared/services/library/library-data.service";
import decode from "jwt-decode";
import {ContentDataService} from "../../shared/services/content/content-data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  conteudos: any[] = [];
  modalConteudo: any[] = [];
  @ViewChild('staticModal') staticModal: any; // Reference to the modal element

  contInBibliotecaForm = this.formBuilder.group({
    Estado: '',
    Rating: ['', [Validators.pattern(/^(?:10|\b[0-9]\b)$/)]],
    Review: ''
  });

  constructor(
    private libraryDataService: LibraryDataService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.libraryDataService.getLibraryByUserId(tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.conteudos = data as any[]; // Cast the data to an array type
    });
  }

  onSubmit(contId : bigint) {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;
    this.libraryDataService.updateContentInLibrary(this.contInBibliotecaForm, tokenPayload.user[0].Id, contId).subscribe();
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
    this.libraryDataService.getContentInLibrary(tokenPayload.user[0].Id, cId).subscribe((data: Object) => {
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
