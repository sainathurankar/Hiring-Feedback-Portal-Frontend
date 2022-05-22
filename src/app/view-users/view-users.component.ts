import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent implements OnInit {
  displayedColumns!: string[];
  dataSource: any = [];
  pageOfItems!: Array<any>;
  role: string = '';
  roleUser!: string;
  KEY: string = 'users';

  constructor(
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    const data: any | null = this.localStorage.getData(this.KEY);
    if (data) {
      this.dataSource = data;
    } else {
      this.authService.getUsers().subscribe((data) => {
        this.dataSource = data.filter(
          (user: { roles: { id: number }[] }) => user.roles[0].id != 3
        );
        this.localStorage.saveData(this.KEY, this.dataSource);
        console.log(this.dataSource);
      });
    }

    this.roleUser = this.tokenService.getUser().roles[0];
    if (this.roleUser == 'ROLE_SUPERADMIN') {
      this.displayedColumns = [
        'id',
        'username',
        'userFirstName',
        'userLastName',
        'email',
        'role',
        'edit',
        'delete',
      ];
    } else {
      this.displayedColumns = [
        'id',
        'username',
        'userFirstName',
        'userLastName',
        'email',
        'role',
      ];
    }
    console.log(this.roleUser);
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  selectChangedHandler(event: any) {
    this.role = event.target.value;
    console.log(event.target.value);
  }

  updateRole(element: any) {
    if (this.role != 'Select Role' && this.role != '') {
      if (this.role == 'ROLE_ADMIN') element.roles[0].id = 2;
      else element.roles[0].id = 1;
      this.authService.updateRole(element).subscribe((data) => {
        console.log('ROle updated to ' + this.role);
      },(err)=>{
        this.updateLocalStorage();
        this.ngOnInit();
      }
      );
    }
  }

  deleteUser(id: number) {
    Swal.fire({
      title: 'Do you want to delete the user?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.authService.deleteUser(id).subscribe((data) => {
          console.log('User deleted');
        });
        Swal.fire('User Deleted!', '', 'success').then((data) => {
          this.ngOnInit();
          this.updateLocalStorage();
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  updateLocalStorage() {
    this.authService.getUsers().subscribe((data) => {
      this.dataSource = data.filter(
        (user: { roles: { id: number }[] }) => user.roles[0].id != 3
      );
      this.localStorage.saveData(this.KEY, this.dataSource);
    });
  }
}
