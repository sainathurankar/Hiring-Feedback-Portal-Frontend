import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CollegesComponent } from './colleges/colleges.component';
import { InterviewerComponent } from './interviewer/interviewer.component';
import { LandingComponent } from './landing/landing.component';
import { SelectedCandidatesComponent } from './selected-candidates/selected-candidates.component';

import { ViewUsersComponent } from './view-users/view-users.component';
import { WeightageComponent } from './weightage/weightage.component';

const routes: Routes = [{ path: 'interviewer', component: InterviewerComponent },
{ path: 'home', component: LandingComponent},
{ path: 'admin', component: AdminComponent,
children:[{
  path: 'colleges', component: CollegesComponent},{
  path: 'selectedCandidates', component: SelectedCandidatesComponent},
  {path: 'weightage', component: WeightageComponent},
 
  {path: 'candidateList', component: CandidateListComponent},
  {path: 'users', component: ViewUsersComponent}
]},

{path: '' , redirectTo: 'home', pathMatch: 'full'},
{path: '**',redirectTo: 'home'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
