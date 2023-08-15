import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../model/cart';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public productList = new BehaviorSubject<Cart[]>([]);
  private baseURL = "http://localhost:9093/api/cart";

  constructor(private httpClient: HttpClient) { }

  addToCart(cart: Cart): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/addToCart`, cart);
  }

  getMovie(): Observable<Cart[]> {
    return this.productList.asObservable();
  }

  getCartItemList(): Observable<Cart[]> {
    return this.httpClient.get<Cart[]>(`${this.baseURL}/viewAllCarts`);
  }

  deleteCartItem(id: any): Observable<Cart> {
    return this.httpClient.delete<Cart>(`${this.baseURL}/deleteCart/${id}`);
  }

  minusOneInCart(cart: Cart): Observable<Object> {
    return this.httpClient.put<Cart>(`${this.baseURL}/minusInCart`, cart);
  }

  addOneInCart(cart: Cart): Observable<Object> {
    return this.httpClient.put<Cart>(`${this.baseURL}/addInCart`, cart);
  }
}
