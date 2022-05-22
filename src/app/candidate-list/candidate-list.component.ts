import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

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
  KEY: string = 'candidates';
  constructor(
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    const data: any | null = this.localStorage.getData(this.KEY);
    if (data){ this.dataSource = data;}
    else {
      this.authService.getCandidates().subscribe((data) => {
        this.dataSource = data;
        this.localStorage.saveData(this.KEY,data);
      });
    }
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
}
