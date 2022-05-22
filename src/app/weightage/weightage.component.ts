import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-weightage',
  templateUrl: './weightage.component.html',
  styleUrls: ['./weightage.component.css'],
})
export class WeightageComponent implements OnInit {
  feedBackQuestion!: string;
  weightage!: number;
  id!: number;
  thresholdValue!: number;
  thresholdId!: number;
  KEYWEIGHTAGE: string = 'weightage';

  displayedColumns: string[] = ['Question', 'Weightage', 'Update'];
  dataSource: any = [];
  dataSource1!: any;

  constructor(
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    const data: any | null = this.localStorage.getData(this.KEYWEIGHTAGE);
    if (data) {
      this.dataSource = data;
    } else {
      this.authService.getWeightage().subscribe((data) => {
        this.dataSource = data;
        this.localStorage.saveData(this.KEYWEIGHTAGE, data);
      });
    }

    this.authService.getThreshold().subscribe((data) => {
      this.dataSource1 = data;
      console.log(this.dataSource1);
      this.thresholdValue = data.thresholdValue;
    });
  }

  saveWeightage() {
    this.authService
      .postWeightages(this.id, this.feedBackQuestion, this.weightage)
      .subscribe((data) => {
        this.ngOnInit();
      });
  }

  updateWeightage() {
    this.authService
      .updateWeightage(this.id, this.feedBackQuestion, this.weightage)
      .subscribe((data) => {
        this.ngOnInit();
        this.updateLocalStorage();
        console.log(data);
      });
  }

  updateClicked(id: number, fbq: string, w: number) {
    this.id = id;
    this.feedBackQuestion = fbq;
    this.weightage = w;
    console.log(id, fbq, w);
  }

  updateThreshold() {
    this.authService.updateThreshold(this.thresholdValue).subscribe((data) => {
      this.ngOnInit();
    });
  }

  close() {
    this.ngOnInit();
  }

  updateLocalStorage() {
    this.authService.getWeightage().subscribe((data) => {
      this.dataSource = data;
      this.localStorage.saveData(this.KEYWEIGHTAGE, data);
    });
  }
}

export interface Weightages {
  id: number;
  feedBackQuestion: string;
  weightage: number;
}

export interface Threshold {
  thresholdId: number;
  thresholdValue: number;
}
