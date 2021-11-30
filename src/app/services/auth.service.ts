import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { College } from '../colleges/colleges.component';

const AUTH_API =
  'https://hiring-feedback-portal-backend.herokuapp.com/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getColleges(): Observable<any> {
    return this.http.get(AUTH_API + 'college');
  }

  postColleges(collegeName: string, collegeTier: number): Observable<any> {
    return this.http.post(
      AUTH_API + 'college',
      { collegeName, collegeTier },
      httpOptions
    );
  }

  postAdmin(
    username: string,
    userFirstName: string,
    userLastName: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post(AUTH_API + 'createAdmin', {
      username,
      userFirstName,
      userLastName,
      email,
      password,
    });
  }

  deleteCollege(id: number) {
    return this.http.delete(AUTH_API + 'college/' + id);
  }

  updateCollege(collegeId: number, collegeName: string, collegeTier: number) {
    return this.http.put(AUTH_API + 'college', {
      collegeId,
      collegeName,
      collegeTier,
    });
  }

  getSelectedCandidates(): Observable<any> {
    return this.http.get(AUTH_API + 'evaluation/' + 'aboveThreshold');
  }

  getThreshold(): Observable<any> {
    return this.http.get(AUTH_API + 'threshold');
  }

  updateThreshold(thresholdValue: number): Observable<any> {
    let thresholdId = 1;
    return this.http.put(AUTH_API + 'threshold', {
      thresholdId,
      thresholdValue,
    });
  }

  getCandidates(): Observable<any> {
    return this.http.get(AUTH_API + 'evaluation');
  }

  postWeightages(
    wId: number,
    wFeedBackQuestion: string,
    wWeightage: number
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'college',
      { wId, wFeedBackQuestion, wWeightage },
      httpOptions
    );
  }

  getWeightage(): Observable<any> {
    return this.http.get(AUTH_API + 'weightage');
  }

  updateWeightage(
    id: number,
    feedBackQuestion: string,
    weightage: number
  ): Observable<any> {
    return this.http.put(
      AUTH_API + 'weightage',
      { id, feedBackQuestion, weightage },
      httpOptions
    );
  }

  // getWeightageById(id: number): Observable<any>{
  //   return this.http.get(AUTH_API+'weightage/{id}');
  // }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(
    username: string,
    userFirstName: string,
    userLastName: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        userFirstName,
        userLastName,
        email,
        password,
      },
      httpOptions
    );
  }

  getUsers(): Observable<any> {
    return this.http.get(AUTH_API + 'users');
  }
  updateRole(user: any): Observable<any> {
    return this.http.patch(AUTH_API + 'users/' + user.id, user.roles[0]);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(AUTH_API + 'users/'+id);
  }

  postEvaluation(candidateName:string, candidateEmail:string, collegeName:string, interviewDate:Date, interviewerName: string,
    hackerrankScore: number, educationAndTraining:number, programmingKnowledge:number, adaptabilityAndFlexibility:number, problemSolving:number,
    logicalReasoning:number, interpersonalAndCommunicationSkills:number, recommendToHire:string, additionalComments:string ){
      return this.http.post(AUTH_API + 'evaluation', {
        candidateName, candidateEmail, collegeName, interviewDate, interviewerName, hackerrankScore, educationAndTraining, programmingKnowledge,
        adaptabilityAndFlexibility, problemSolving, logicalReasoning, interpersonalAndCommunicationSkills, recommendToHire, additionalComments
      })
    }


}
