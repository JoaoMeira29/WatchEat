import { Component } from '@angular/core';
import {PedidosDataService} from "../../_shared/services/Pedidos/pedidos-data.service";
import decode from "jwt-decode";

@Component({
  selector: 'app-pagina-pedidos',
  templateUrl: './pag-pedidos.component.html',
  styleUrls: ['./pag-pedidos.component.css']
})
export class PagPedidosComponent {
  pedidos: any[] = [];

  constructor(private pedidosDataService: PedidosDataService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.pedidosDataService.getUserPedidos(tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.pedidos = data as any[]; // Cast the data to an array type
    });
  }
}
