import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProdutosDataService {

  constructor(private http: HttpClient) { }

  getProdutos() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/Produtos';
    return this.http.get(url, {headers});
  }
}

