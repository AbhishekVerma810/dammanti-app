import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Browser } from '@capacitor/browser';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token: string;
  userData: any;
  fcmToken: any;

  constructor(private loader: LoaderService, private http: HttpClient) {
    this.getLocalStorageData();
  }

  getLocalStorageData() {
    this.userData = JSON.parse(localStorage.getItem('user_data'));
    console.log('hello abhi', this.userData);
    return this.userData;
  }

 

  login(data: any) {
    return this.http.post(`${environment.baseUrl}/api/auth/login`, data);
  }
  


  forgotPassword(data: any) {
    return this.http.post(`${environment.baseUrl}/api/auth/forget-password`, data);
  }
  resetPassword(data: any) {
    return this.http.post(`${environment.baseUrl}/api/auth/reset/password`, data);
  }
  forgotPasswordWitOtp(data) {
    return this.http.post(`${environment.baseUrl}/api/user/reset/password`, data);
  }
  verifyOtp(data) {
    return this.http.post('http://localhost:3000/api/auth/verify-email', data);
  }
  signup(data) {
    return this.http.post(`${environment.baseUrl}/api/auth/signup`, data)
  }
  addProduct(data){
    return this.postApi('/api/product/create', data);
  }
  getCategory(){
    return this.getApi('/api/category/all');
  }
  addCategory(data){
    return this.postApi('/api/category/add', data);
  }
  // getProductDetail(id:any){
  //   return this.getApi(`/api/product/details/${id}`);
  // }
  getProductDetail(id: any): Observable<any> {
    return this.getApi(`/api/product/details/${id}`);
  }
  
  getHttpHeaders() {
    const data = JSON.parse(localStorage.getItem('user_data'));
    if (data?.data) {
      this.token = data?.data.token;
    } else if (data) {
      this.token = data?.token;
    }

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }
  getApi(url: any) {
    return this.http.get(`${environment.baseUrl}${url}`, this.getHttpHeaders());
  }

  postApi(url: any, formData: any) {
    return this.http.post(`${environment.baseUrl}${url}`, formData, this.getHttpHeaders());
  }
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
  postUpdateApi(url: any) {
    return this.http.post(`${environment.baseUrl}${url}`, {}, this.getHttpHeaders());
  }
  deleteApi(url: any) {
    console.log('url====>', url)
    return this.http.post(`${environment.baseUrl}${url}`, {}, this.getHttpHeaders());
  }
}