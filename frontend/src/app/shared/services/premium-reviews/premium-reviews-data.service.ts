import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PremiumReviewsDataService {

  constructor(private http: HttpClient) { }

  getPremiumReviewsByUserIdAndContentId(userId : bigint, currentUrl : string) {
    const contId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${environment.apiUrl}/premium-reviews/user/${userId}/content/${contId}`;
    return this.http.get(url, {headers});
  }

  getPremiumReviewsByContentId(currentUrl : string) {
    const contId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${environment.apiUrl}/premium-reviews/content/${contId}`;
    return this.http.get(url, {headers});
  }

  addPremiumReview(revPremium : FormGroup, userId : bigint, currentUrl: string ) {
    const contId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      ConteudoId: contId,
      Rating: revPremium.get('Rating')?.value,
      Review: revPremium.get('Review')?.value
    }

    const url = `${environment.apiUrl}/premium-reviews/user/${userId}`;
    return this.http.post(url, body, {headers});
  }
}
