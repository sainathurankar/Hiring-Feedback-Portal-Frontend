import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  login_signup = true;

  form_signup: any = {
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    password: null,
  };
  confirm_password!: string;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage_signup = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      if (this.roles[0] == 'ROLE_INTERVIEWER')
        this.route.navigate(['/interviewer']);
      if (this.roles[0] == 'ROLE_ADMIN' || this.roles[0] == 'ROLE_SUPERADMIN')
        this.route.navigate(['/admin/colleges']);
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        // alert();
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Welcome ' + this.tokenStorage.getUser().userFirstname,
          showConfirmButton: false,
          timer: 1000,
        }).then((result) => {
          this.ngOnInit();
        });
      },
      (err) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'INVALID CREDENTIALS',
          showConfirmButton: false,
          timer: 1500,
        });
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  onSubmit_signup(): void {
    const { username, firstname, lastname, email, password } = this.form_signup;

    this.authService
      .register(username, firstname, lastname, email, password)
      .subscribe(
        (data) => {
          console.log(data);
          // this.isSuccessful = true;
          this.isSignUpFailed = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'You have Registered Successfully!',
            showConfirmButton: true,
          }).then((result) => {
            window.location.reload();
          });

          // alert("Signup successful");
        },
        (err) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: true,
          });
          console.log(err);
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
  }

  toggle_form(): void {
    this.login_signup = !this.login_signup;
  }
}
