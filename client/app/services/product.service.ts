import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import Product from '../models/product';

import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api_url = 'http://localhost:8080';
  productUrl = `${this.api_url}/todo`;

  constructor(
    private http: HttpClient
  ) { }

  //Create product, takes a Product Object
  createProduct(product: Product): Observable<Product[]>{
    return this.http.post(`${this.productUrl}`, product)
      .map(res  => {
        return res['data'].docs as Product[];
      })
  }

  //Read product, takes no arguments
  getProducts(): Observable<Product[]>{
    let getUrl = `${this.productUrl}/list`;
    return this.http.get(getUrl)
      .map(res  => {
        return res['data'].docs as Product[];
      })
  }

  //Delete product, takes a Product Object
  deleteProduct(product: Product): Observable<Product[]> {
    //Delete the object by the id
    let deleteUrl = `${this.productUrl}/${product._id}`;
    return this.http.delete(deleteUrl)
      .map(res => {
        return res['data'].docs as Product[];
      })
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo
    return Promise.reject(error.message || error);
  }
}












  

