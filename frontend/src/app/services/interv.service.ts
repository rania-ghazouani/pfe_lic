import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { intervention } from '../models/intervention';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class IntervService {

  constructor(private _http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }
  
  private url = "http://localhost:8000/api";



  getProducts(): Observable<intervention[]> {        //omit : creer un type user et exclue userId
    return this._http
      .get<intervention[]>(`${this.url}/intervention`, { responseType: "json"})   
      .pipe(                                                                    //pipe :on utilise pipe pour transformer une valeur entré dans un input et transformer en string                                                                 
        catchError(this.errorHandlerService.handleError<intervention[]>("getintervention", []))
      );
  }




  createProduct(formData: Omit<intervention, "productId, userId">): Observable<intervention> {
    return this._http
    .post<intervention>(`${this.url}/intervention`, formData, 
    this.httpOptions)   
    .pipe(                                                                    //pipe :on utilise pipe pour transformer une valeur entré dans un input et transformer en string                                                                 
      catchError(this.errorHandlerService.handleError<intervention>("createIntervention"))
    );
}



deleteProduct(interventionId: Pick<intervention, "interventionId">): Observable<{}>{
return this._http.delete<intervention>(`${this.url}/intervention/${interventionId}`, this.httpOptions).pipe(
  catchError(this.errorHandlerService.handleError<intervention>("deleteIntervention"))
    );
  }




  updateProduct(formData: Omit<intervention, "productId, userId">, interventionId: Pick<intervention, "interventionId">): Observable<{}>{
    return this._http.put<intervention>(`${this.url}/product/${interventionId}`,formData, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<intervention>("updateintervention"))
    )
  }

}
