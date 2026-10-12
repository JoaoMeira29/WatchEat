import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UtilizadoresDataService {

  constructor(private http: HttpClient) { }

  getUtilizadores() {
    const url = 'http://localhost:3000/api/Utilizadores';
    return this.http.get(url);
  }

  getUtilizadorById(Id : string) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/Utilizador/' + Id;
    return this.http.get(url, { headers } );
  }

  getUtilizadorAmizade(Id : bigint) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/UtilizadorAmizade/' + Id;
    return this.http.get(url, { headers } );
  }

  getUtilizadorAmizadePendentes(Id : bigint, estado : string) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = 'http://localhost:3000/api/UtilizadorAmizade/' + Id + `/${encodeURIComponent(estado)}`;
    console.log(url);
    return this.http.get(url, { headers } );
  }

  getUtilizadorAmizadeTop6(Id : string) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/UtilizadorAmizadeTop6/' + Id;
    return this.http.get(url, { headers } );
  }

  addPedidoAmizadeByEmail(userId : bigint, userData : FormGroup) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      Email: userData.get('Email')?.value,
    };

    const url = 'http://localhost:3000/api/UtilizadorAmizadeByEmail/' + userId;
    return this.http.post(url, body,{ headers } );
  }

  updateUtilizador(Id : bigint, userData : FormGroup) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      Nome: userData.get('Nome')?.value,
      Apelido: userData.get('Apelido')?.value,
      NTelemovel: userData.get('NTelemovel')?.value,
      Morada: userData.get('Morada')?.value,
      NIF: userData.get('NIF')?.value
    };

    const url = 'http://localhost:3000/api/Utilizador/' + Id;
    return this.http.put(url, body,{ headers } );
  }

  updateUtilizadorAmizade(userId1: number, userId2: number) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      uId2: userId2,
      Estado: "Amigos"
    };

    const url = 'http://localhost:3000/api/Utilizador/PedidoAmizade/' + userId1;
    return this.http.put(url, body,{ headers } );
  }

  deleteUtilizador(Id : bigint) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/Utilizador/' + Id;
    return this.http.delete(url,{ headers } );
  }
}
