import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/service/admin-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  //admin login data
  adminLoginData = {
    emailId: '',
    password: ''
  }
  //store error message
  errorMessage: String = '';
  //strore login input boolean value
  adminAuth: any;

  constructor(private adminService: AdminServiceService, private router: Router) { }


  //admin login method
  adminLogin() {
    if (this.adminLoginData.emailId == null || this.adminLoginData.emailId.trim() == '') {
      this.errorMessage = "Enter EmailId";
      return
    }
    if (this.adminLoginData.password == null || this.adminLoginData.password.trim() == '') {
      this.errorMessage = "Enter Password";
      return
    }

    this.adminService.adminLogin(this.adminLoginData).subscribe(data => {
      this.adminAuth = data;
      if (this.adminAuth == true) {
        this.router.navigate(['/adminMovies']);
        console.log("Success login admin")
      } else {
        console.log("Try again login admin")
        this.errorMessage = "Username or password incorrect"
      }
    })
  }
}
