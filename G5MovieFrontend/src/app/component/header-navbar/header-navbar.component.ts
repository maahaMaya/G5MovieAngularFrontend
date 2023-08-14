import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart';
import { Customer } from 'src/app/model/customer';
import { Movie } from 'src/app/model/movie';
import { CartService } from 'src/app/service/cart.service';
import { CustomerService } from 'src/app/service/customer.service';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss']
})
export class HeaderNavbarComponent implements OnInit {
  login?: number = 0;
  message: string = '';
  formValue!: FormGroup;
  customer: Customer = new Customer('', '', '', '');
  auth: any;
  customerLoginData = {
    emailId: '',
    password: ''
  };
  movieList: any;
  cart: Cart = new Cart(0, 1, 0, new Movie(1, 'Movie Name', 'Description', 'Duration', 10 , 100, 'Available',  'Available','image.jpg'));
  products: Cart[] = [];
  //activeOrders: Purchase[] = [];
  totalItem: number = 0;
  customerName? : string;

  constructor(
    private cartService: CartService,
    private movieService: MovieService,
    private customerService: CustomerService,
    //private purchaseService: PurchaseService,
    private formbuilder: FormBuilder,
    private router: Router
  ) { this.customer = new Customer('', '', '', ''); }

  ngOnInit(): void {

    this.movieService.getFullMovieList().subscribe((res) => {
      this.movieList = res;
    });

    this.formValue = this.formbuilder.group({
      fullName: [''],
      emailId: [''],
      password: [''],
      phoneNumber: ['']
    });
  }

  addCustomer() {
    this.customer.fullName = this.formValue.value.fullName;
    this.customer.emailId = this.formValue.value.emailId;
    this.customer.password = this.formValue.value.password;
    this.customer.phoneNumber = this.formValue.value.phoneNumber;

    this.customerService.addCustomer(this.customer).subscribe(
      (data) => {
        sessionStorage.setItem('customerEmail', this.customer.emailId);

        alert("Welcome to G5 Movies..")
        let ref = document.getElementById('Rcancel');
        ref?.click();
        this.formValue.reset();
        this.pageRefresh();
      },
      (error) => {
        this.message = 'User already exists, Please Login';
      }
    );
  }

  pageRefresh() {
    this.router.navigate(['/movie']);
  }

  loginSubmit() {
    if (this.customerLoginData.emailId.trim() === '' || this.customerLoginData.emailId === null) {
      this.message = 'Enter Email';
      return;
    }
    if (this.customerLoginData.password.trim() === '' || this.customerLoginData.password === null
    ) {
      this.message = 'Enter password';
      return;
    }

    this.customerService.customerLogin(this.customerLoginData).subscribe((data) => {
      this.auth = data;
      if (this.auth === true) {
        this.login = 1;
        this.customerName = this.customerLoginData.emailId;
        sessionStorage.setItem('customerEmail', this.customerLoginData.emailId);
        let ref = document.getElementById('Lcancel');
        ref?.click();
        this.formValue.reset();
        this.pageRefresh();
      } else {
        this.message = 'Username or password incorrect';
      }
    });
  }

  CustomerLogout() {
    this.login = 0;
    // this.cartService.deleteAllCart().subscribe((data) => {
    //   console.log('cart empty');
    // });
    sessionStorage.setItem('customerEmail', '');
  }

  getActiveOrders() {
    // const email: string | null = sessionStorage.getItem('cust_email');
    // if (email) {
    //   this.purchaseService.getCustomerOrders(email).subscribe((data) => {
    //     this.activeOrders = data;
    //   });
    // }
  }
}


