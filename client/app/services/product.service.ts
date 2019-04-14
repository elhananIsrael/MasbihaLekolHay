import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import Product from '../models/product';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseService } from '../shared/services';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private getUrl = '/api/products';
  private saveUrl = '/api/product';

  constructor(private baseService: BaseService) { }

  getProducts(): Observable<any> {
    return this.baseService.getAll(this.getUrl);
  }

  countProducts(): Observable<any> {
    return this.baseService.count(this.getUrl);
  }

  addProduct(product): Observable<any> {
    return this.baseService.add(this.saveUrl, product);
  }

  getProduct(product): Observable<any> {
    return this.baseService.getById(this.saveUrl, product);
  }

  editProduct(product): Observable<any> {
    return this.baseService.editById(this.saveUrl, product);
  }

  deleteProduct(product): Observable<any> {
    return this.baseService.deleteById(this.saveUrl, product);
  }



  
  /*
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

*/


}












  

