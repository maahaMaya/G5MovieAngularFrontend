import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AdminMoviesComponent } from './component/admin-movies/admin-movies.component';
import { AdminCustomerComponent } from './component/admin-customer/admin-customer.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CartComponent } from './component/cart/cart.component';
import { PaymentComponent } from './component/payment/payment.component';
import { OrderSuccessComponent } from './component/order-success/order-success.component';

const routes: Routes = [
  { path: '', redirectTo: 'movie', pathMatch: 'full' },
  { path: 'movie', component: DashboardComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'orderedSuccess', component: OrderSuccessComponent },
  { path: 'admin', component: AdminLoginComponent },
  { path: 'adminMovies', component: AdminMoviesComponent },
  { path: 'manageCustomer', component: AdminCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
