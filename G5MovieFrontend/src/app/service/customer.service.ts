import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseURL = "http://localhost:9093/api/customer";
  constructor(private httpClient: HttpClient) { }

  addCustomer(customer: Customer): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/addCustomer`, customer);
  }

  customerLogin(customerLoginData: any): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/login`, customerLoginData);
  }

  getCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.baseURL}/viewAll`);
  }

  searchCustomer(searchKeyword: any): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.baseURL}/viewAllBy/${searchKeyword}`);
  }

  deleteCustomer(emailId: string): Observable<Customer> {
    return this.httpClient.delete<Customer>(`${this.baseURL}/deleteCustomer/${emailId}`);
  }

  getCustomer(emailId: string): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.baseURL}/viewBy/${emailId}`);
  }
}
