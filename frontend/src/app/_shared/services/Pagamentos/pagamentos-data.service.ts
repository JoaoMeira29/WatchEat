import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PagamentosDataService {

  constructor(private http: HttpClient) { }

  getPagamento(pagamentoId : string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/Pagamento/' + pagamentoId;
    return this.http.get(url, { headers } );
  }

  getUserPagamentos(userId : string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/UserPagamentos/' + userId;
    return this.http.get(url, { headers } );
  }

  getUserPagamentoPremiumNaoPago(userId : string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/PagamentoPremiumNaoPago/' + userId;
    return this.http.get(url, { headers } );
  }

  createPagamentoPremium(userId : bigint) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      UtilizadorId: userId
    };

    const url = 'http://localhost:3000/api/PagamentoPremium';
    return this.http.post(url, body, { headers } );
  }

  updatePagamento(pagamentoId : number, estadoPag : string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      Estado: estadoPag
    };

    const url = 'http://localhost:3000/api/Pagamento/' + pagamentoId;
    return this.http.put(url, body, { headers } );
  }
}
