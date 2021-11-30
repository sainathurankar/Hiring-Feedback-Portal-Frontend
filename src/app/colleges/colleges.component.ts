import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';




@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css'],
})
export class CollegesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'tier', 'delete'];
  collegeId!: number;
  collegeName!: string;
  addCollege:boolean = true;
  collegeTier!: number;
  modalTitle: string = 'Add College';
  dataSource: any = [];
  pageOfItems!: Array<any>;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.getColleges().subscribe((data) => {
      this.dataSource = data;
    });
  }

  addCollegeClicked() {
    this.authService
      .postColleges(this.collegeName, this.collegeTier)
      .subscribe((data) => {
        this.ngOnInit();
      });
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  remove(id: number) {
    Swal.fire({
      title: 'Do you want to delete the college?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.authService.deleteCollege(id).subscribe(
          (data) => {
            console.log('deleted');
          },
          (err) => {
            console.log(err);
          }
        );
        
        Swal.fire('College Deleted!', '', 'success').then((data)=>{this.ngOnInit();})
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
  }

  editClicked(collegeId: number, collegeName: string, collegeTier: number){
    this.collegeId = collegeId;
    this.collegeName = collegeName;
    this.collegeTier = collegeTier;
    this.modalTitle = 'Update College';
    this.addCollege = false;
  }

  update() {
    this.authService
      .updateCollege(this.collegeId, this.collegeName, this.collegeTier)
      .subscribe(
        (data) => {
          this.ngOnInit();
          console.log('updated');
        },
        (err) => {
          console.log('not updated');
        }
      );
  }

  close(){
    this.ngOnInit();
  }

}
export interface College {
  collegeId: number,
  collegeName: string,
  collegeTier: number

}

 