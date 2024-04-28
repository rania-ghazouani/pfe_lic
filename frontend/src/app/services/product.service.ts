import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { product } from '../models/product';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }
  productId: Pick<product, "productId">;
  private url = "http://localhost:8000/api";


 


  getProducts(): Observable<product[]> {        //omit : creer un type user et exclue userId
    return this._http
      .get<product[]>(`${this.url}/products`, { responseType: "json"})   
      .pipe(                                                                    //pipe :on utilise pipe pour transformer une valeur entré dans un input et transformer en string                                                                 
        catchError(this.errorHandlerService.handleError<product[]>("getProduct", []))
      );
  }




  createProduct(formData: Omit<product, "productId, userId, isArchived, creationDate, updateDate">): Observable<product> {
    return this._http
    .post<product>(`${this.url}/product`, formData, 
    this.httpOptions)   
    .pipe(                                                                    //pipe :on utilise pipe pour transformer une valeur entré dans un input et transformer en string                                                                 
      catchError(this.errorHandlerService.handleError<product>("createProduct"))
    );
}



deleteProduct(productId: Pick<product, "productId">): Observable<{}>{
return this._http.delete<product>(`${this.url}/product/${productId}`, this.httpOptions).pipe(
  catchError(this.errorHandlerService.handleError<product>("deleteProduct"))
    );
  }




  updateProduct(formData: Omit<product, "productId, userId, isArchived, creationDate, updateDate">, productId: Pick<product, "productId">): Observable<{}>{
    return this._http.put<product>(`${this.url}/product/${productId}`,formData, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<product>("updateProduct"))
    )
  }



  archiveProduct(productId: Pick<product, "productId">): Observable<{}>{
    return this._http.put<product>(`${this.url}/archive/${productId}`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<product>("updateArchive"))
    )
  }




}


  

 

  
