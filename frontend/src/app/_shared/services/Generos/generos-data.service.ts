import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GenerosDataService {

  constructor(private http: HttpClient) { }

  getGenerosByContId(currentUrl : string) {
    const contId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    const url = 'http://localhost:3000/api/ConteudoGeneros/' + contId;
    return this.http.get(url);
  }
}
