import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class BibliotecaDataService {

  constructor(private http: HttpClient) { }

  getBibliotecas() {
    const url = 'http://localhost:3000/api/Bibliotecas';
    return this.http.get(url);
  }

  getBibliotecaById(Id : bigint) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/Biblioteca/' + Id;
    return this.http.get(url, { headers } );
  }

  getBibliotecaFilmesTop6ById(Id : string) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/BibliotecaFilmesTop6/' + Id;
    return this.http.get(url, { headers } );
  }

  getBibliotecaSeriesTop6ById(Id : string) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/BibliotecaSeriesTop6/' + Id;
    return this.http.get(url, { headers } );
  }

  getConteudoInBiblioteca(userId : string, Id : string) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      ConteudoId: Id
    };
    const url = 'http://localhost:3000/api/BibliotecaConteudo/' + userId;
    return this.http.post(url, body ,{ headers } );
  }

  checkConteudoInBiblioteca(currentUrl : string, Id : string) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const conteudoId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    const body = {
      ConteudoId: conteudoId
    };
    const url = 'http://localhost:3000/api/CheckConteudoInBiblioteca/' + Id;
    return this.http.post(url, body ,{ headers } );
  }

  addConteudoInBiblioteca(currentUrl : string, userId : bigint) {
    const Id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    const body = {
      ConteudoId: Id
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/Biblioteca/' + userId;
    return this.http.post(url, body,{ headers } );
  }

  updateConteudoInBiblioteca(contData : FormGroup, userId : bigint, contId: bigint) {
    const body = {
      cId: contId,
      Review: contData.get('Review')?.value,
      Rating: contData.get('Rating')?.value,
      Estado: contData.get('Estado')?.value
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/Biblioteca/' + userId;
    return this.http.put(url, body,{ headers } );
  }
}
