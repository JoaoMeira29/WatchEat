import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ContentDataService {

  constructor(private http: HttpClient) { }

  getContents() {
    const url = `${environment.apiUrl}/contents`;
    return this.http.get(url);
  }

  getRandomContents() {
    const url = `${environment.apiUrl}/contents/random`;
    return this.http.get(url);
  }

  getContentById(currentUrl : string) {
    const Id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    const url = `${environment.apiUrl}/contents/${Id}`;
    return this.http.get(url);
  }

  getMovies() {
    const url = `${environment.apiUrl}/contents/movies`;
    return this.http.get(url);
  }

  getSeries() {
    const url = `${environment.apiUrl}/contents/series`;
    return this.http.get(url);
  }

  addMovie(conteudoData : FormGroup, generosArray : any) {
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

    const url = `${environment.apiUrl}/contents/movies`;
    return this.http.post(url, body, {headers});
  }

  addSeries(conteudoData : FormGroup, generosArray : any) {
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

    const url = `${environment.apiUrl}/contents/series`;
    return this.http.post(url, body, {headers});
  }
}
