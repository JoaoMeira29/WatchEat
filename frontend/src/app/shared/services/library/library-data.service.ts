import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class LibraryDataService {

  constructor(private http: HttpClient) { }

  getLibraries() {
    const url = `${environment.apiUrl}/libraries`;
    return this.http.get(url);
  }

  getLibraryByUserId(Id : bigint) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${environment.apiUrl}/libraries/${Id}`;
    return this.http.get(url, { headers } );
  }

  getLibraryTopMovies(Id : string) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${environment.apiUrl}/libraries/${Id}/top-movies`;
    return this.http.get(url, { headers } );
  }

  getLibraryTopSeries(Id : string) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${environment.apiUrl}/libraries/${Id}/top-series`;
    return this.http.get(url, { headers } );
  }

  getContentInLibrary(userId : string, Id : string) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      ConteudoId: Id
    };
    const url = `${environment.apiUrl}/libraries/${userId}/content/find`;
    return this.http.post(url, body ,{ headers } );
  }

  checkContentInLibrary(currentUrl : string, Id : string) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const conteudoId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    const body = {
      ConteudoId: conteudoId
    };
    const url = `${environment.apiUrl}/libraries/${Id}/content/check`;
    return this.http.post(url, body ,{ headers } );
  }

  addContentToLibrary(currentUrl : string, userId : bigint) {
    const Id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    const body = {
      ConteudoId: Id
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${environment.apiUrl}/libraries/${userId}`;
    return this.http.post(url, body,{ headers } );
  }

  updateContentInLibrary(contData : FormGroup, userId : bigint, contId: bigint) {
    const body = {
      cId: contId,
      Review: contData.get('Review')?.value,
      Rating: contData.get('Rating')?.value,
      Estado: contData.get('Estado')?.value
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${environment.apiUrl}/libraries/${userId}`;
    return this.http.put(url, body,{ headers } );
  }
}
