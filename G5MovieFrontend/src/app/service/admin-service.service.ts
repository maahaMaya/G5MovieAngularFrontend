import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private baseURL="http://localhost:9093/api/admin/login"
  constructor(private httpClient:HttpClient) { }

  adminLogin(loginData:any):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,loginData);
  }

}
