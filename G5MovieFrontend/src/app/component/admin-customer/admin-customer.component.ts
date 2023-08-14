import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.scss']
})
export class AdminCustomerComponent implements OnInit {
  searchKey: string = '';
  public allCustomers: Customer[] = [];
  activeOrders = 0;
  //public activeOrders: Purchase[] = [];

  constructor(
    private customerService: CustomerService,
    //private purchaseService: PurchaseService,
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

  getActiveOrders(email: string) {
    // this.purchaseService.getCustomerOrders(email).subscribe((data) => {
    //   this.activeOrders = data;
    // });
  }

  deleteCustomer(email: string) {
    this.customerService.deleteCustomer(email).subscribe(
      (data) => {
        alert('Customer Deleted');
        this.getCustomers();
      },
      (error) => {
        alert("Customer can't be deleted until their orders are deleted");
      }
    );
  }
}
