import {Component, ViewChild } from '@angular/core';
import {PagamentosDataService} from "../../_shared/services/Pagamentos/pagamentos-data.service";
import decode from "jwt-decode";
import {HeaderComponent} from "../../_shared/components/header/header.component";
import {AuthService} from "../../_shared/services/_Auth/auth.service";

@Component({
  selector: 'app-pagina-pagamentos',
  templateUrl: './pag-pagamentos.component.html',
  styleUrls: ['./pag-pagamentos.component.css']
})
export class PagPagamentosComponent {
  pagamentos: any[] = [];
  modalConteudo: any[] = [];
  @ViewChild('staticModal') staticModal: any; // Reference to the modal element
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  constructor(
    private pagamentosDataService: PagamentosDataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.pagamentosDataService.getUserPagamentos(tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.pagamentos = data as any[]; // Cast the data to an array type
    });
  }

  pagarPagamento(pagamentoId: number, tipoPagamento: string) {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.pagamentosDataService.updatePagamento(pagamentoId, "Pago").subscribe();
    this.closeModal();
    setTimeout(() => {
      if (tipoPagamento == 'Tier premium' ){
        setTimeout(() => {
          this.authService.LogoutUser();
        }, 400)
      }
      else {
        window.location.reload();
      }
    },100)
  }

  cancelarPagamento(pagamentoId: number) {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.pagamentosDataService.updatePagamento(pagamentoId, "Terminou o Prazo").subscribe();
    this.closeModal();
    setTimeout(() => {
      window.location.reload();
    },100)
  }

  openModal(pagamentoId: number) {
    this.staticModal.nativeElement.classList.remove('hidden');
    this.staticModal.nativeElement.classList.add('flex');

    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    const pId : string = pagamentoId.toString();
    this.pagamentosDataService.getPagamento(pId).subscribe((data: Object) => {
      this.modalConteudo = data as any[]; // Cast the data to an array type
    });
  }

  closeModal() {
    this.staticModal.nativeElement.classList.remove('flex');
    this.staticModal.nativeElement.classList.add('hidden');
  }
}
