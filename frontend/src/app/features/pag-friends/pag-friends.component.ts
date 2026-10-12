import {Component, ViewChild} from '@angular/core';
import {UtilizadoresDataService} from "../../_shared/services/Utilizadores/utilizadores-data.service";
import {FormBuilder} from "@angular/forms";
import decode from "jwt-decode";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-pag-friends',
  templateUrl: './pag-friends.component.html',
  styleUrls: ['./pag-friends.component.css']
})
export class PagFriendsComponent {
  errorMessage: string | null = null;
  currentUserId: number = 0;
  utilizadores: any[] = [];
  @ViewChild('staticModal') staticModal: any; // Reference to the modal element

  pedidoAmizadeForm = this.formBuilder.group({
    Email: ''
  });

  constructor(
    private utilizadoresDataService: UtilizadoresDataService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.utilizadoresDataService.getUtilizadorAmizade(tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.currentUserId = tokenPayload.user[0].Id
      this.utilizadores = data as any[];
    })
  }

  filterFriends(estado : string) {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    if (estado == 'Pedido Enviado') {
      this.utilizadoresDataService.getUtilizadorAmizadePendentes(tokenPayload.user[0].Id, estado).subscribe((data: Object) => {
        this.currentUserId = tokenPayload.user[0].Id;
        this.utilizadores = data as any[];
      })
    }
    else {
      this.utilizadoresDataService.getUtilizadorAmizade(tokenPayload.user[0].Id).subscribe((data: Object) => {
        this.currentUserId = tokenPayload.user[0].Id
        this.utilizadores = data as any[];
      })
    }
  }

  acceptAmigo(userId1: number, userId2: number) {
    this.utilizadoresDataService.updateUtilizadorAmizade(userId1,userId2).subscribe((data: Object) => {
      window.location.reload();
    })
  }

  openModal() {
    this.staticModal.nativeElement.classList.remove('hidden');
    this.staticModal.nativeElement.classList.add('flex');
  }

  closeModal() {
    this.staticModal.nativeElement.classList.remove('flex');
    this.staticModal.nativeElement.classList.add('hidden');
  }

  addPedidoAmizade() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.utilizadoresDataService.addPedidoAmizadeByEmail(tokenPayload.user[0].Id, this.pedidoAmizadeForm)
      .pipe(first())
      .subscribe(
        (response: any) => {
          this.errorMessage = null;
          window.location.reload();
        },
        (error : any)  => {
          this.errorMessage = error.error.error;
        }
      );
  }
}
