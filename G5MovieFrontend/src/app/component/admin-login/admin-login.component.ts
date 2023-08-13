import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/model/admin';
import { AdminServiceService } from 'src/app/service/admin-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

  formValue !: FormGroup;
  errorMessage: String = '';
  adminLoginData = {
    emailId: '',
    password: ''
  }
  //strore login input boolean value
  auth: any;

  constructor(private adminService: AdminServiceService, private router: Router) { }


  //admin login method
  adminLogin() {
    if (this.adminLoginData.emailId == null) {
      this.errorMessage = "Enter Username";
      return
    }
    if (this.adminLoginData.password == null) {
      this.errorMessage = "Enter Password";
      return
    }

    this.adminService.adminLogin(this.adminLoginData).subscribe(data => {
      this.auth = data;
      if (this.auth == true) {
        console.log("Success login admin")
      } else {
        console.log("Try again login admin")
        this.errorMessage = "Username or password incorrect"
      }
    })

  }

}
