import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BaseService } from '../shared/services';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private getUrl = '/api/orders';
  private saveUrl = '/api/order';

  constructor(private baseService: BaseService) { }

  getOrders(): Observable<any> {
    return this.baseService.getAll(this.getUrl);
  }

  countOrders(): Observable<any> {
    return this.baseService.count(this.getUrl);
  }

  addOrder(order): Observable<any> {
    return this.baseService.add(this.saveUrl, order);
  }

  getOrder(order): Observable<any> {
    return this.baseService.getById(this.saveUrl, order);
  }

  editOrder(order): Observable<any> {
    return this.baseService.editById(this.saveUrl, order);
  }

  deleteOrder(order): Observable<any> {
    return this.baseService.deleteById(this.saveUrl, order);
  }


}
