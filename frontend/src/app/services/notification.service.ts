import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { notification } from '../models/notification';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _http: HttpClient, private errorHandlerService: ErrorHandlerService) { }


  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }


  notificationId: Pick<notification, "notificationId">;
  private url = "http://localhost:8000/api";

  public get alertObject(): notification {
    var loginToken = localStorage.getItem("token");
    var extractedToken = loginToken.split('.')[1];
    var atobData = atob(extractedToken);
    var finalData = JSON.parse(atobData);
    return finalData.userName
  }


  getNotifications(): Observable<notification[]> {        
    return this._http
      .get<notification[]>(`${this.url}/alerts`, { responseType: "json"})   
      .pipe(                                                                    //pipe :on utilise pipe pour transformer une valeur entré dans un input et transformer en string                                                                 
        catchError(this.errorHandlerService.handleError<notification[]>("getnotification", []))
      );
  }


  createNotification(): Observable<notification> {    //omit : creer un type user et exclue des parametres declarés
    return this._http
    .post<notification>(`${this.url}/alerte`,
    this.httpOptions)   
    .pipe(                                                                    //pipe :on utilise pipe pour transformer une valeur entré dans un input et transformer en string                                                                 
      catchError(this.errorHandlerService.handleError<notification>("createnotification"))
    );
}
}
