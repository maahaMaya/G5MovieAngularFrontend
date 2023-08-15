import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public carts: Cart[] = [];
  public grandTotal: any = 0;
  public customerLoginMessage : any = 1;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getCartItemList();
  }

  

  private getCartItemList() {
    this.cartService.getCartItemList().subscribe((res: Cart[]) => {
      this.carts = res;
      this.grandTotal = 0;
      for (let i = 0; i < this.carts.length; i++) {
        this.grandTotal += this.carts[i].price;
      }
      sessionStorage.setItem('grandTotal', '' + this.grandTotal);
    });
  }

  deleteCartItem(id: any) {
    this.cartService.deleteCartItem(id).subscribe((res) => {
      this.getCartItemList();
    });
  }

  addOneCart(cart: Cart) {
    this.cartService.addOneInCart(cart).subscribe((res) => {
      this.getCartItemList();
    });
  }

  lessOneCart(cart: Cart) {
    this.cartService.minusOneInCart(cart).subscribe((res) => {
      this.getCartItemList();
    });
  }
}
