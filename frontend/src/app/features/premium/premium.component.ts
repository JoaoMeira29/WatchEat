import { Component } from '@angular/core';
import decode from "jwt-decode";
import {PaymentsDataService} from "../../shared/services/payments/payments-data.service";

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent {
  pagamentoPremiumNaoPago: any[] = [];

  constructor(private paymentsDataService: PaymentsDataService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.paymentsDataService.getUnpaidPremiumPayments(tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.pagamentoPremiumNaoPago = data as any[]; // Cast the data to an array type
    });
  }

  AderirPremium() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.paymentsDataService.createPremiumPayment(tokenPayload.user[0].Id).subscribe();
    window.alert("Obrigado por aderir ao Watch'Eat Premium!");
    window.location.reload();
  }
}
