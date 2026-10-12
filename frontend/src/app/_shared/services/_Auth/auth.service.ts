import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { tap } from 'rxjs/operators';
import {CanActivate, Router} from "@angular/router";
import decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  isUserLogged = true;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  authLogin(email: string, password: string) {
    const url = 'http://localhost:3000/api/authLogin';
    const body = {
      Email: email,
      Password: password
    };

    return this.http.post(url, body, {observe: 'response'});
  }

  authRegister(email: string, password: string, confirm_password: string) {
    const url = 'http://localhost:3000/api/authRegister';
    const body = {
      Email: email,
      Password: password,
      confirm_password: confirm_password
    };

    return this.http.post(url, body, {observe: 'response'});
  }




  canActivate(): boolean {
    if (this.IsUserLogged()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  IsUserLogged() : boolean {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    if (!token){
      return false;
    }
    else {
      const tokenPayload = decode(token) as { exp: number };
      const currentTime = Math.floor(Date.now() / 1000);

      if (tokenPayload.exp < currentTime) {
        localStorage.removeItem('token');
        return false;
      } else {
        return true;
      }
    }
  }

  LogUser(authToken : any) {
    localStorage.setItem('token', authToken);
    this.router.navigate(['/pagina-inicial']);
  }

  LogoutUser() {
    // Get the token from local storage or any other source
    localStorage.removeItem('token');
    // Set the token in the request headers

    this.isUserLogged = false;
    this.router.navigate(['/login']);
  }
}
