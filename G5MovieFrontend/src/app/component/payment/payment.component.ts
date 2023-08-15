import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderedService } from 'src/app/service/ordered.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent  implements OnInit{

  emailId? : any;
  constructor(
    private router: Router,
    private orderService : OrderedService
  ){}
  ngOnInit(): void {
    this.emailId = sessionStorage.getItem('customerEmail');
  }
  bookMovie() {
    this.orderService.createCustomerOrder(this.emailId).subscribe(() => {
      alert("Order Successfully....")
    })
    this.router.navigate(['/orderedSuccess']);
  }
}
