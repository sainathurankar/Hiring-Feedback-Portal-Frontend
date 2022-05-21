import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  firstname: string = '';
  username!: string;
  userFirstName!: string;
  userLastName!: string;
  email!: string;
  password!: string;
  role!: string;

  constructor(
    private tokenService: TokenStorageService,
    private route: Router,
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (!this.tokenService.getToken()) this.route.navigate(['/home']);
    this.firstname = this.tokenService.getUser().userFirstname;
    this.role = this.tokenService.getUser().roles[0];
  }

  signout() {
    this.tokenService.signOut();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logged out Sucessfully',
      showConfirmButton: false,
      timer: 1000,
    }).then((data) => {
      this.route.navigate(['/home']);
      this.localStorage.clear();
    });
  }

  addAdminSaveClicked() {
    this.authService
      .postAdmin(
        this.username,
        this.userFirstName,
        this.userLastName,
        this.email,
        this.password
      )
      .subscribe((data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Admin Registered Successfully!',
          showConfirmButton: true,
        }).then((result) => {
          this.ngOnInit();
        });
      });
  }
}

export interface Admin {
  username: string;
  userFirstName: string;
  userLastName: string;
  email: string;
  password: string;
}
