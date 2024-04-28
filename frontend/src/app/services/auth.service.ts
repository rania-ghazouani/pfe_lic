import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import {
  catchError,
  first,
  tap,
} from 'rxjs/operators';

import { user } from '../models/user';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class authService {


  constructor(private _http: HttpClient, private router: Router, private errorHandlerService: ErrorHandlerService, ) { 
    
  }

  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }

  private url = "http://localhost:8000/api/auth";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);  //behaviour subject is both observable and type of observable
  userId: Pick<user, "userId">;
  tokenresp: any;

  


  haveAccess() {
    var loginToken = localStorage.getItem("token");
    var extractedToken = loginToken.split('.')[1];   //get payload: the part of token that contains data of the user
    var atobData = atob(extractedToken)    //atob : decodes a string of data
    var finalData = JSON.parse(atobData)
    if(finalData.userType === "administrateur"){
      return true;
    }
    alert('you not having access');
    return false;
  }

  public get userName(): user {
    var loginToken = localStorage.getItem("token");
    var extractedToken = loginToken.split('.')[1];
    var atobData = atob(extractedToken);
    var finalData = JSON.parse(atobData);
    return finalData.userName
  }

  public get userType(): user {
    var loginToken = localStorage.getItem("token");
    var extractedToken = loginToken.split('.')[1];
    var atobData = atob(extractedToken);
    var finalData = JSON.parse(atobData);
    return finalData.userType
  }


  public get email(): user {
    var loginToken = localStorage.getItem("token");
    var extractedToken = loginToken.split('.')[1];
    var atobData = atob(extractedToken);
    var finalData = JSON.parse(atobData);
    return finalData.email
  }

  public get id(): user {
    var loginToken = localStorage.getItem("token");
    var extractedToken = loginToken.split('.')[1];
    var atobData = atob(extractedToken);
    var finalData = JSON.parse(atobData);
    return finalData.userId
  }




  forgot(body:any){
    
    return this._http.post('http://localhost:8000/api/forgot', body,{
      observe: 'body'
    });
  }





  reset(resetLink: Pick<user, "resetLink">, formData: Pick<user, "pwd">){
    return this._http.put(`${this.url}/reset/${resetLink}`,formData, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<user>("resetpwd")) 
      
    );
  }

  


  login(
    email: Pick<user, "email">,
    pwd: Pick<user, "pwd">
  ): Observable<{                                 //same as promises 
    token: string;
    userId: Pick<user, "userId">;
  }> {
    return this._http
      .post(`${this.url}/login`, { email, pwd }, this.httpOptions)
      .pipe(
        first(),
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        tap((tokenObject: { token: string; userId: Pick<user, "userId"> }) => {
          this.userId = tokenObject.userId;
          localStorage.setItem("token", tokenObject.token);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(["dashboard"]);
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: Pick<user, "userId">;
          }>("login")
        )
      );
  }
  


  
  register(user: Omit<user, "userId, resetLink">): Observable<user> {        //omit : creer un type user et exclue userId
    return this._http
      .post<user>(`${this.url}/signup`, user, this.httpOptions)   
      .pipe(                                                                    //pipe :on utilise pipe pour transformer une valeur entré dans un input et transformer en string 
        first(),                                                                //first : emmet la premiere valeur que rencontre une condition, si pas de condition donc il va remettre la premiere valeur reçu 
        catchError(this.errorHandlerService.handleError<user>("register"))
      );
  }



}
