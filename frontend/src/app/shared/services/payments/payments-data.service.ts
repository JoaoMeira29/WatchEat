import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentsDataService {

  constructor(private http: HttpClient) { }

  getPayment(pagamentoId : string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${environment.apiUrl}/payments/${pagamentoId}`;
    return this.http.get(url, { headers } );
  }

  getUserPayments(userId : string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${environment.apiUrl}/users/${userId}/payments`;
    return this.http.get(url, { headers } );
  }

  getUnpaidPremiumPayments(userId : string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${environment.apiUrl}/users/${userId}/payments/premium/unpaid`;
    return this.http.get(url, { headers } );
  }

  createPremiumPayment(userId : bigint) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      UtilizadorId: userId
    };

    const url = `${environment.apiUrl}/payments/premium`;
    return this.http.post(url, body, { headers } );
  }

  updatePayment(pagamentoId : number, estadoPag : string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      Estado: estadoPag
    };

    const url = `${environment.apiUrl}/payments/${pagamentoId}`;
    return this.http.put(url, body, { headers } );
  }
}
