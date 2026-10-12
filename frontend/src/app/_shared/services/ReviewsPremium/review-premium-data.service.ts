import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ReviewPremiumDataService {

  constructor(private http: HttpClient) { }

  getReviewsPremiumByUserIdAndContId(userId : bigint, currentUrl : string) {
    const contId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/ReviewsPremiumUserCont/' + userId + '/' + contId;
    return this.http.get(url, {headers});
  }

  getReviewsPremiumByContId(currentUrl : string) {
    const contId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/ReviewsPremiumCont/' + contId;
    return this.http.get(url, {headers});
  }

  addReviewsPremiumByContId(revPremium : FormGroup, userId : bigint, currentUrl: string ) {
    const contId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      ConteudoId: contId,
      Rating: revPremium.get('Rating')?.value,
      Review: revPremium.get('Review')?.value
    }

    const url = 'http://localhost:3000/api/ReviewPremium/' + userId;
    return this.http.post(url, body, {headers});
  }
}
