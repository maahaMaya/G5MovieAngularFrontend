import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { Ordered } from 'src/app/model/ordered';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderedService } from 'src/app/service/ordered.service';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.scss']
})
export class AdminCustomerComponent implements OnInit {
  searchKey: string = '';
  public allCustomers: Customer[] = [];
  activeOrderss? = 0;
  activeOrders: Ordered[] = [];

  constructor(
    private customerService: CustomerService,
    private orderService: OrderedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((data) => {
      this.allCustomers = data;
      console.log(data)
    });
  }

  adminLogout() {
    this.router.navigate(['/admin']);
  }

  searchCustomer() {
    if (this.searchKey === '') {
      this.getCustomers();
    } else {
      this.customerService.searchCustomer(this.searchKey).subscribe((data) => {
        this.allCustomers = data;
      });
    }
  }

  getActiveOrders(emailId: string) {
    this.orderService.getCustomerOrder(emailId).subscribe((data) => {
      this.activeOrders = data;
      console.log(data)
    })
  }

  deleteCustomer(email: string) {
    this.customerService.deleteCustomer(email).subscribe(
      (data) => {
        alert('Customer Deleted');
        this.getCustomers();
      }
      //,
      // (error) => {
      //   alert("Customer can't be deleted until their orders are deleted");
      // }
    );
  }
}
