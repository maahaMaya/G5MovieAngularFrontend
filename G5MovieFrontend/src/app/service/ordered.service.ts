import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordered } from '../model/ordered';

@Injectable({
  providedIn: 'root'
})
export class OrderedService {

  private baseURL = "http://localhost:9093/api/ordered";
  constructor(private httpClient: HttpClient) { }


  public createCustomerOrder(emailId: String): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseURL}/createOrder/${emailId}`);
  }

  public getCustomerOrder(emailId: any): Observable<Ordered[]> {
    return this.httpClient.get<Ordered[]>(`${this.baseURL}/viewCustomersOrder/${emailId}`);
  }

  public getAllOrder(): Observable<Ordered[]> {
    return this.httpClient.get<Ordered[]>(`${this.baseURL}/viewAllOrders}`);
  }
}
