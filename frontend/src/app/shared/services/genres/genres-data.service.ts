import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GenresDataService {

  constructor(private http: HttpClient) { }

  getGenresByContentId(currentUrl : string) {
    const contId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    const url = `${environment.apiUrl}/contents/${contId}/genres`;
    return this.http.get(url);
  }
}
