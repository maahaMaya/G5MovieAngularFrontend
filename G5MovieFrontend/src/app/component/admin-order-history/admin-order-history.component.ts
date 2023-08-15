import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ordered } from 'src/app/model/ordered';
import { OrderedService } from 'src/app/service/ordered.service';

@Component({
  selector: 'app-admin-order-history',
  templateUrl: './admin-order-history.component.html',
  styleUrls: ['./admin-order-history.component.scss']
})
export class AdminOrderHistoryComponent implements OnInit{
  searchKey: string = '';
  activeOrders: Ordered[] = [];

  constructor(
    private orderService: OrderedService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.orderService.getAllOrder().subscribe((data) => {
      this.activeOrders = data;
    })
  }

  adminLogout() {
    this.router.navigate(['/admin']);
  }

}
