import { Component } from '@angular/core';
import {OrdersDataService} from "../../shared/services/orders/orders-data.service";
import decode from "jwt-decode";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  pedidos: any[] = [];

  constructor(private ordersDataService: OrdersDataService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.ordersDataService.getUserOrders(tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.pedidos = data as any[]; // Cast the data to an array type
    });
  }
}
