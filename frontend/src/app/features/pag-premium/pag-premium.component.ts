import { Component } from '@angular/core';
import decode from "jwt-decode";
import {PagamentosDataService} from "../../_shared/services/Pagamentos/pagamentos-data.service";

@Component({
  selector: 'app-pag-premium',
  templateUrl: './pag-premium.component.html',
  styleUrls: ['./pag-premium.component.css']
})
export class PagPremiumComponent {
  pagamentoPremiumNaoPago: any[] = [];

  constructor(private pagamentosDataService: PagamentosDataService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.pagamentosDataService.getUserPagamentoPremiumNaoPago(tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.pagamentoPremiumNaoPago = data as any[]; // Cast the data to an array type
    });
  }

  AderirPremium() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.pagamentosDataService.createPagamentoPremium(tokenPayload.user[0].Id).subscribe();
    window.alert("Obrigado por aderir ao Watch'Eat Premium!");
    window.location.reload();
  }
}
