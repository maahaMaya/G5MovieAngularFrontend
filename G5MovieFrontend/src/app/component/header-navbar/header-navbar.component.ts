import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart';
import { Customer } from 'src/app/model/customer';
import { Movie } from 'src/app/model/movie';
import { Ordered } from 'src/app/model/ordered';
import { CartService } from 'src/app/service/cart.service';
import { CustomerService } from 'src/app/service/customer.service';
import { MovieService } from 'src/app/service/movie.service';
import { OrderedService } from 'src/app/service/ordered.service';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss']
})
export class HeaderNavbarComponent implements OnInit {
  @Input() customerLoginMessage?: any = 0;
  message: string = '';
  formValue!: FormGroup;
  customer: Customer = new Customer('', '', '', '');
  auth: any;
  customerLoginData = {
    emailId: '',
    password: ''
  };

  customerUpdateData = {
    emailId: '',
    password: ''
  };

  customerUpdatePasswordData = {
    confirmPassword: ''
  };

  movieList: any;
  cart: Cart = new Cart(0, 1, 0, new Movie(1, 'Movie Name', 'Description', 'Duration', 10 , 100, 'Available',  'Available',true));
  products: Cart[] = [];
  activeOrders: Ordered[] = [];
  totalItem: number = 0;
  customerName! : string;

  constructor(
    private cartService: CartService,
    private movieService: MovieService,
    private customerService: CustomerService,
    private orderService : OrderedService,
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

    if(sessionStorage.getItem('customerEmail') === null || sessionStorage.getItem('customerEmail') === ''){
      this.customerLoginMessage = 0;
    }
    else{
      this.customerLoginMessage = 1;
    }
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
        this.customerLoginMessage = 1;
        this.customerName = this.customerLoginData.emailId;
        this.customerUpdateData.emailId =  this.customerLoginData.emailId;
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

  updatePassword(){
    if (this.customerUpdateData.password.trim() === '' || this.customerUpdateData.password === null) {
      this.message = 'Enter password';
      return;
    }
    if (this.customerUpdatePasswordData.confirmPassword.trim() === '' || this.customerUpdatePasswordData.confirmPassword === null
    ) {
      this.message = 'Enter confirm password';
      return;
    }
    if(this.customerUpdateData.password != this.customerUpdatePasswordData.confirmPassword){
      this.message = 'Enter Same password';
      return
    }

    console.log(this.customerUpdateData)
    this.customerService.updateCustomerPassword(this.customerUpdateData).subscribe((data) => {
      this.auth = data;
      if (this.auth === true) {
        alert("password updated successfully")
        let ref = document.getElementById('Ucancel');
        ref?.click();
        this.formValue.reset();
        this.pageRefresh();
      } 
    });
  }
  CustomerLogout() {
    sessionStorage.clear();
    this.customerLoginMessage = 0;
    this.router.navigate(['/movie']);
  }

  getActiveOrders() {
    const emailId: String | null = sessionStorage.getItem('customerEmail');
    this.orderService.getCustomerOrder(emailId).subscribe((data) => {
      this.activeOrders = data;
      console.log(data)
    });
  }

  // @Input() customerLoginMessages? : any;
  // ngOnChanges(changes: SimpleChanges) {
  //   this.customerLoginMessage = this.customerLoginMessages;
  // }
}


