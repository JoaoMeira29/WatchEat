import {Component, ViewChild } from '@angular/core';
import {PaymentsDataService} from "../../shared/services/payments/payments-data.service";
import decode from "jwt-decode";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {AuthService} from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  pagamentos: any[] = [];
  modalConteudo: any[] = [];
  @ViewChild('staticModal') staticModal: any; // Reference to the modal element
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  constructor(
    private paymentsDataService: PaymentsDataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.paymentsDataService.getUserPayments(tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.pagamentos = data as any[]; // Cast the data to an array type
    });
  }

  pagarPagamento(pagamentoId: number, tipoPagamento: string) {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.paymentsDataService.updatePayment(pagamentoId, "Pago").subscribe();
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

    this.paymentsDataService.updatePayment(pagamentoId, "Terminou o Prazo").subscribe();
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
    this.paymentsDataService.getPayment(pId).subscribe((data: Object) => {
      this.modalConteudo = data as any[]; // Cast the data to an array type
    });
  }

  closeModal() {
    this.staticModal.nativeElement.classList.remove('flex');
    this.staticModal.nativeElement.classList.add('hidden');
  }
}
