import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ConteudosDataService {

  constructor(private http: HttpClient) { }

  getConteudos() {
    const url = 'http://localhost:3000/api/Conteudos';
    return this.http.get(url);
  }

  getConteudosRandom10() {
    const url = 'http://localhost:3000/api/ConteudosRandom10';
    return this.http.get(url);
  }

  getConteudoById(currentUrl : string) {
    const Id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    const url = 'http://localhost:3000/api/Conteudo/' + Id;
    return this.http.get(url);
  }

  getConteudosFilmes() {
    const url = 'http://localhost:3000/api/Conteudos/Filmes';
    return this.http.get(url);
  }

  getConteudosSeries() {
    const url = 'http://localhost:3000/api/Conteudos/Series';
    return this.http.get(url);
  }

  addConteudoFilme(conteudoData : FormGroup, generosArray : any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      Nome: conteudoData.get('Nome')?.value,
      Poster: conteudoData.get('Poster')?.value,
      Realizador: conteudoData.get('Realizador')?.value,
      Rating: conteudoData.get('Rating')?.value,
      DataReleased: conteudoData.get('DataReleased')?.value,
      Sinopse: conteudoData.get('Sinopse')?.value,
      Trailer: conteudoData.get('Trailer')?.value,
      Duracao: conteudoData.get('Duracao')?.value,
      generos: generosArray,
      atores: []
    };

    const url = 'http://localhost:3000/api/Conteudo/Filme';
    return this.http.post(url, body, {headers});
  }

  addConteudoSerie(conteudoData : FormGroup, generosArray : any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      Nome: conteudoData.get('Nome')?.value,
      Poster: conteudoData.get('Poster')?.value,
      Realizador: conteudoData.get('Realizador')?.value,
      Rating: conteudoData.get('Rating')?.value,
      DataReleased: conteudoData.get('DataReleased')?.value,
      Sinopse: conteudoData.get('Sinopse')?.value,
      Trailer: conteudoData.get('Trailer')?.value,
      NTemporadas: conteudoData.get('NTemporadas')?.value,
      Estado: conteudoData.get('Estado')?.value,
      DataFim: conteudoData.get('DataFim')?.value ? conteudoData.get('DataFim')?.value : '1899-12-31',
      NEpisodiosTotais: conteudoData.get('NTEpisodios')?.value,
      generos: generosArray,
      atores:[]
    };

    const url = 'http://localhost:3000/api/Conteudo/Serie';
    return this.http.post(url, body, {headers});
  }
}
