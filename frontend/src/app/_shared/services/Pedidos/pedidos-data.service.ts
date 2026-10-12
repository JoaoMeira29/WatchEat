import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PedidosDataService {

  constructor(private http: HttpClient) { }

  getUserPedidos(userId : string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/UserPedidos/' + userId;
    return this.http.get(url, { headers } );
  }

  addPedido(pedidoData : FormGroup, produtosArray : any, userId : number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      Descricao: pedidoData.get('Descricao')?.value,
      Morada: pedidoData.get('Morada')?.value,
      HoraReservada: pedidoData.get('HoraReservada')?.value,
      UtilizadorId: userId,
      produtos: produtosArray
    };

    const url = 'http://localhost:3000/api/Pedido';
    return this.http.post(url, body, {headers});
  }
}
