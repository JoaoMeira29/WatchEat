import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class OrdersDataService {

  constructor(private http: HttpClient) { }

  getUserOrders(userId : string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${environment.apiUrl}/users/${userId}/orders`;
    return this.http.get(url, { headers } );
  }

  addOrder(pedidoData : FormGroup, produtosArray : any, userId : number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      Descricao: pedidoData.get('Descricao')?.value,
      Morada: pedidoData.get('Morada')?.value,
      HoraReservada: pedidoData.get('HoraReservada')?.value,
      UtilizadorId: userId,
      produtos: produtosArray
    };

    const url = `${environment.apiUrl}/orders`;
    return this.http.post(url, body, {headers});
  }
}
