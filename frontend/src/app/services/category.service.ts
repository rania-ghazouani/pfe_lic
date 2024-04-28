import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { categoryProduct } from '../models/category';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }


  categoryId: Pick<categoryProduct, "categoryId">;
  private url = "http://localhost:8000/api";

  getCategories(): Observable<categoryProduct[]> {        
    return this._http
      .get<categoryProduct[]>(`${this.url}/categories`, { responseType: "json"})   
      .pipe(                                                                    //pipe :on utilise pipe pour transformer une valeur entré dans un input et transformer en string                                                                 
        catchError(this.errorHandlerService.handleError<categoryProduct[]>("getCategories", []))
      );
  }

  createCategory(formData: Omit<categoryProduct, "categoryId">): Observable<categoryProduct> {    //omit : creer un type user et exclue des parametres declarés
    return this._http
    .post<categoryProduct>(`${this.url}/category`, formData, 
    this.httpOptions)   
    .pipe(                                                                    //pipe :on utilise pipe pour transformer une valeur entré dans un input et transformer en string                                                                 
      catchError(this.errorHandlerService.handleError<categoryProduct>("createCategory"))
    );
}

deleteCategory(categoryId: Pick<categoryProduct, "categoryId">): Observable<{}>{
return this._http.delete<categoryProduct>(`${this.url}/category/${this.categoryId}`, this.httpOptions).pipe(
  catchError(this.errorHandlerService.handleError<categoryProduct>("deleteCategory"))
    );
  }
}
