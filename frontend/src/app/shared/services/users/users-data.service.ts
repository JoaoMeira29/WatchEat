import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(private http: HttpClient) { }

  getUsers() {
    const url = `${environment.apiUrl}/users`;
    return this.http.get(url);
  }

  getUserById(Id : string) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${environment.apiUrl}/users/${Id}`;
    return this.http.get(url, { headers } );
  }

  getUserFriendships(Id : bigint) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${environment.apiUrl}/users/${Id}/friendships`;
    return this.http.get(url, { headers } );
  }

  getUserFriendshipsByStatus(Id : bigint, estado : string) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${environment.apiUrl}/users/${Id}/friendships/status/${encodeURIComponent(estado)}`;
    console.log(url);
    return this.http.get(url, { headers } );
  }

  getUserTopFriendships(Id : string) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${environment.apiUrl}/users/${Id}/friendships/top`;
    return this.http.get(url, { headers } );
  }

  addFriendRequestByEmail(userId : bigint, userData : FormGroup) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      Email: userData.get('Email')?.value,
    };

    const url = `${environment.apiUrl}/users/${userId}/friendships/by-email`;
    return this.http.post(url, body,{ headers } );
  }

  updateUser(Id : bigint, userData : FormGroup) {
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

    const url = `${environment.apiUrl}/users/${Id}`;
    return this.http.put(url, body,{ headers } );
  }

  acceptFriendRequest(userId1: number, userId2: number) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      uId2: userId2,
      Estado: "Amigos"
    };

    const url = `${environment.apiUrl}/users/${userId1}/friendships`;
    return this.http.put(url, body,{ headers } );
  }

  deleteUser(Id : bigint) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${environment.apiUrl}/users/${Id}`;
    return this.http.delete(url,{ headers } );
  }
}
