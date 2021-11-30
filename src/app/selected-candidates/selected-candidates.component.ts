import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
 import * as XLSX from 'xlsx';

@Component({
  selector: 'app-selected-candidates',
  templateUrl: './selected-candidates.component.html',
  styleUrls: ['./selected-candidates.component.css'],
})
export class SelectedCandidatesComponent implements OnInit {
  @ViewChild('TABLE') table!: ElementRef;

  displayedColumns: string[] = [
    'id',
    'candidateName',
    'candidateEmail',
    'collegeName',
    'interviewDate',
    'interviewerName',
    'finalScore',
    'recommendToHire',
  ];
  dataSource: any = [];
  pageOfItems!: Array<any>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getSelectedCandidates().subscribe((data) => {
      this.dataSource = data;
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource, {
      header: [
        'id',
        'candidateName',
        'candidateEmail',
        'collegeName',
        'interviewDate',
        'interviewerName',
        'hackerrankScore',
        'educationAndTraining',
        'programmingKnowledge',
        'adaptabilityAndFlexibility',
        'problemSolving',
        'logicalReasoning',
        'interpersonalAndCommunicationSkills',
        'finalScore',
        'recommendToHire',
        'additionalComments',
      ]
    });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Selected Candidates List.xlsx');
  }
}
