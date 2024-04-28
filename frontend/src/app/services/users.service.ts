import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { user } from '../models/user';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient, private router: Router, private errorHandlerService: ErrorHandlerService) { }

  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }

  userId: Pick<user, "userId">

  private url = "http://localhost:8000/api";

  getUsers(): Observable<user[]> {        //omit : creer un type user et exclue userId
    return this._http
      .get<user[]>(`${this.url}/users`, { responseType: "json"})   
      .pipe(                                                                    //pipe :on utilise pipe pour transformer une valeur entré dans un input et transformer en string                                                                 
        catchError(this.errorHandlerService.handleError<user[]>("getUser", []))
      );
  }

deleteUser(userId: Pick<user, "userId">): Observable<{}>{
return this._http.delete<user>(`${this.url}/user/${userId}`, this.httpOptions).pipe(
  catchError(this.errorHandlerService.handleError<user>("deleteUser"))
    );
  }


 updateUser(formData: Pick<user, "userName" | "pwd">, userId: Pick<user, "userId">): Observable<{}>{
   return this._http.put<user>(`${this.url}/user/${userId}`, formData, this.httpOptions).pipe(
    catchError(this.errorHandlerService.handleError<user>("deleteUser"))
   );
 }
}


