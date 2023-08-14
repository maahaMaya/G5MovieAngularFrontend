import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AdminMoviesComponent } from './component/admin-movies/admin-movies.component';
import { AdminCustomerComponent } from './component/admin-customer/admin-customer.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'admin', component: AdminLoginComponent },
  { path: 'adminMovies', component: AdminMoviesComponent },
  { path: 'manageCustomer', component: AdminCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
