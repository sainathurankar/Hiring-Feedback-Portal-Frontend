import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { TokenStorageService } from '../services/token-storage.service';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

import * as $ from 'jquery'

@Component({
  selector: 'app-interviewer',
  templateUrl: './interviewer.component.html',
  styleUrls: ['./interviewer.component.css'],
})
export class InterviewerComponent implements OnInit {
  exform!: FormGroup;
  exform1!: FormGroup;
  toggle: Boolean = true;
  interviewerName: string = '';
  tier!: number;
  collegeSelected: boolean = false;
  collegeName: string = '';

  myControl = new FormControl();
  options: any[] = [];
  filteredOptions!: Observable<any[]>;
  constructor(
    private tokenService: TokenStorageService,
    private route: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.tokenService.getToken()) this.route.navigate(['/home']);
    this.interviewerName = this.tokenService.getUser().userFirstname;
    // console.log(this.interviewerName);

    this.auth.getColleges().subscribe((data) => {
      this.options = data;
      console.log(this.options);
      // alert("fetched");
      this.setProgressBar(this.current);
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.collegeName)),
      map((name) => (name ? this._filter(name) : this.options.slice()))
    );

    this.exform = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      // collegename: new FormControl(null, Validators.required),
      // CollegeTier: new FormControl(null, Validators.required),

      InterviewDate: new FormControl(null, Validators.required),
      InterviewerName: new FormControl(null, Validators.required),
    });

    this.exform1 = new FormGroup({
      HackerrankScore: new FormControl(null, Validators.required),
      EducationAndTraining: new FormControl(null, Validators.required),
      ProgrammingKnowledge: new FormControl(null, Validators.required),
      AdaptabilityAndFlexibility: new FormControl(null, Validators.required),
      ProblemSolving: new FormControl(null, Validators.required),
      LogicalReasoning: new FormControl(null, Validators.required),
      InterpersonalAndCommunicationSkills: new FormControl(
        null,
        Validators.required
      ),
      RecommendToHire: new FormControl(null, Validators.required),
      AdditionalComments: new FormControl(null, Validators.required),
    });
  }

  displayFn(user: any): string {
    return user && user.collegeName ? user.collegeName : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.collegeName.toLowerCase().includes(filterValue)
    );
  }

  clicksub(event:any) {
    Swal.showLoading();
    this.auth
      .postEvaluation(
        this.exform.value.name,
        this.exform.value.email,
        this.myControl.value.collegeName,
        this.exform.value.InterviewDate,
        this.exform.value.InterviewerName,
        this.exform1.value.HackerrankScore,
        this.exform1.value.EducationAndTraining,
        this.exform1.value.ProgrammingKnowledge,
        this.exform1.value.AdaptabilityAndFlexibility,
        this.exform1.value.ProblemSolving,
        this.exform1.value.LogicalReasoning,
        this.exform1.value.InterpersonalAndCommunicationSkills,
        this.exform1.value.RecommendToHire,
        this.exform1.value.AdditionalComments
      )
      .subscribe(
        (data) => {
          this.nextq(event);
          console.log(data);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success!',
            showConfirmButton: true,
          }).then((result) => {
            window.location.reload();
          });
        },
        (err) => {
          console.log('error');
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: true,
          });
        }
      );
    console.log(this.exform.value);
    console.log(this.exform1.value);
  }

  option() {
    this.tier = this.myControl.value.collegeTier;
    this.collegeName = this.myControl.value.collegeName;
    this.collegeSelected = true;
    // console.log(this.myControl.value);
  }
  toggles() {
    this.toggle = !this.toggle;
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
    });
  }

  current_fs: any;
  next_fs: any;
  previous_fs: any; //fieldsets
  opacity: any;
  current = 1;
  steps = 4;

  nextq(event: any) {
    // var target = event.target || event.srcElement || event.currentTarget;
    // var idAttr = target.attributes.id;
    // var value = idAttr.nodeValue;
    // console.log(event.path[1].next());
    // // console.log(target.parent());
    // console.log(idAttr);
    // console.log(value);

    // console.log("nn");
    console.log('next');
    console.log(event.path[1]);
    // this.current_fs = $(event).parent();
    this.current_fs = event.path[1].id;
    console.log(this.current_fs);
    this.next_fs = $('#' + this.current_fs).next();
    console.log(this.next_fs);

    $('#' + this.current_fs).hide();
    this.next_fs.show();

    // this.next_fs = $(this).parent().next();

    $('#progressbar li')
      .eq($('fieldset').index(this.next_fs))
      .addClass('active');

      this.setProgressBar(++this.current);
    // this.next_fs.show();

    // this.current_fs.hide();
  }

  back(event:any){


     console.log('back');
     console.log(event.path[1]);
     // this.current_fs = $(event).parent();
     this.current_fs = event.path[1].id;
     console.log(this.current_fs);
     this.previous_fs = $('#' + this.current_fs).prev();
     console.log(this.previous_fs);
     console.log(this.current);
     
 $('#progressbar li')
   .eq(this.current-1)
   .removeClass('active');
     $('#' + this.current_fs).hide();
     this.previous_fs.show();
     this.setProgressBar(--this.current);
  }

  percent:any;
  setProgressBar(curStep:any) {
    this.percent = 100 / this.steps * curStep;
    this.percent = this.percent.toFixed();
    $('.progress-bar').css('width', this.percent + '%');
  }
}
