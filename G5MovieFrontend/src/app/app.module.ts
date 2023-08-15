import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminMoviesComponent } from './component/admin-movies/admin-movies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminCustomerComponent } from './component/admin-customer/admin-customer.component';
import { HeaderNavbarComponent } from './component/header-navbar/header-navbar.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MovieComponent } from './component/movie/movie.component';
import { CartComponent } from './component/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminMoviesComponent,
    AdminCustomerComponent,
    HeaderNavbarComponent,
    DashboardComponent,
    MovieComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
