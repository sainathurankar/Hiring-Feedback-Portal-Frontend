import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-weightage',
  templateUrl: './weightage.component.html',
  styleUrls: ['./weightage.component.css']
})
export class WeightageComponent implements OnInit {
  feedBackQuestion!: string;
  weightage!: number;
  id!: number;
  thresholdValue!: number;
  thresholdId!: number;
  
  
  displayedColumns: string[] = ['Question', 'Weightage','Update'];
  dataSource: any = [];
  dataSource1!: any;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
    this.authService.getWeightage().subscribe((data)=>{
      this.dataSource = data;
      console.log(this.dataSource);
      
    })

    this.authService.getThreshold().subscribe((data) => {
      this.dataSource1 = data;
      console.log(this.dataSource1);
      this.thresholdValue = data.thresholdValue
    });

   
    
    


  }

  saveWeightage(){
    this.authService.postWeightages(this.id, this.feedBackQuestion,this.weightage).subscribe((data)=>{
      this.ngOnInit();
    
   })
    

  }

  updateWeightage(){
    this.authService.updateWeightage(this.id, this.feedBackQuestion,this.weightage).subscribe((data)=>{
      this.ngOnInit();
      console.log(data);
    
   })

  }

  updateClicked(id: number, fbq: string, w: number){
    this.id = id;
    this.feedBackQuestion = fbq;
    this.weightage = w;
    console.log(id,fbq,w);
    
  }




 
updateThreshold(){
  this.authService.updateThreshold(this.thresholdValue).subscribe((data)=>{ this.ngOnInit();})

}

close(){
  this.ngOnInit();
}

}

export interface Weightages{
  id: number;
  feedBackQuestion: string;
  weightage: number;
}


export interface Threshold{
  thresholdId: number;
  thresholdValue: number;
}
