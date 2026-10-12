import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EstatisticasDataService {

  constructor(private http: HttpClient) { }

  getEstatisticas() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/Estatisticas';
    return this.http.get(url, {headers});
  }
}
