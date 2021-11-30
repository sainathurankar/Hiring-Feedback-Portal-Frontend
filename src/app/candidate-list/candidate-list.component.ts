import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
})
export class CandidateListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'candidateName',
    'candidateEmail',
    'collegeName',
  ];
  dataSource: any = [];
  pageOfItems!: Array<any>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCandidates().subscribe((data) => {
      this.dataSource = data;
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
}
