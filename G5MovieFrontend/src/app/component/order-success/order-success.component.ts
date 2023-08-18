import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

import { CartService } from 'src/app/service/cart.service';
import { CustomerService } from 'src/app/service/customer.service';
import { Customer } from 'src/app/model/customer';
import { Cart } from 'src/app/model/cart';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {
    customer: Customer = new Customer('', '', '', ''); 
    cust_email: string = '';
    cartItems: Cart[] = [];
    total: number = 0;
    grandTotal: number = 0;
    todayDate: any;
  
    constructor(
      private customerService: CustomerService,
      private cartService: CartService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.cust_email = sessionStorage.getItem('cust_email') || '';
      this.customerService.getCustomer(this.cust_email).subscribe((data) => {
        this.customer = data;
      });
      this.cartService.getCartItemList().subscribe((data) => {
        this.cartItems = data;
      });
      this.total = Number(sessionStorage.getItem('grandTotal')) || 0;
      this.grandTotal = this.total + 60; // Assuming the shipping fee is $60
      this.todayDate = formatDate(new Date(), 'dd MMM, yyyy', 'en');
    }
}