import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterviewerComponent } from './interviewer/interviewer.component';
import { AdminComponent } from './admin/admin.component';
import { CollegesComponent } from './colleges/colleges.component';
import {MatTableModule} from '@angular/material/table';
import { JwPaginationModule } from 'jw-angular-pagination';
import { authInterceptorProviders } from './helper/auth.interceptor';
import { SelectedCandidatesComponent } from './selected-candidates/selected-candidates.component';
import { WeightageComponent } from './weightage/weightage.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';





@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    InterviewerComponent,
    AdminComponent,
    CollegesComponent,
    SelectedCandidatesComponent,
    WeightageComponent,
    CandidateListComponent,
    ViewUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    JwPaginationModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
