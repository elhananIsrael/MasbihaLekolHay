import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BaseService } from '../shared/services/base.service';

import { HttpClient } from '@angular/common/http';
import Product from '../models/product';
import Order from '../models/order';

import  {AuthService } from './../shared/services/auth.service'



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private getUrl = '/api/orders';
  private saveUrl = '/api/order';

  constructor(private baseService: BaseService,
    private auth: AuthService,
     private http: HttpClient) { }

  getOrders(): Observable<any> {
    return this.baseService.getAll(this.getUrl);
  }


////////////////////////////////////////////////////////////////////////

  // Get by user id all orders of user
  getByIdAllOrdersOfUser(entity: any): Observable<Order[]> {
    return this.http.get( '/api/ordersOfUser' + `/${entity}`).map(res  => {
      return res['data'].docs as Order[];
    });
  }

  ////////////////////////////////////////////////////////////////////////

  // Get by user id Current Order Of User
  getByIdCurrentOrderOfUser(entity: any): Observable<any> {
    return this.http.get( '/api/currentOrderOfUser' + `/${entity}`).map(res  => {
      let order = res;// as Order;
      console.log('wwwww: ' + JSON.stringify(order));
      if (order == undefined || order == null) {
        //  order._id = null;
        let newOrder : any = {};

        //  order = new Order;
         newOrder.userID = this.auth.currentUser._id;
         newOrder.userName = this.auth.currentUser.username;
         newOrder.price = 0;
        //  order.date =  Date.now;
         this.addOrder(newOrder);
        // this.baseService.add(this.saveUrl, order);
      }
      console.log('wwwww: ' + JSON.stringify(order));

      return order;
    });
  }

  ///////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////
  // Read order, takes no arguments return Order Object
  getOrdersObjects(): Observable<Order[]>{
    let getUrl = 'http://localhost:3000/api/orders';
       //`${this.productUrl}/list`;
    return this.http.get(getUrl)
      .map(res  => {
        return res['data'].docs as Order[];
      })
  }
  /////////////////////////////////////////
/*
    ///////////////////////////////////////
  // Read product, takes no arguments return Product Object
  getAllUserOrdersObjects(userID: String): Observable<Order[]>{
let myOrders: Observable<Order[]>;
myOrders = this.getOrdersObjects();
var order =  myOrders.filter(( order: Order ) => order._id === userID );
//return this.http.get(url + `/${entity._id}`).map(res => res.json());
return order;
  /*  let getUrl = 'http://localhost:3000/api/orders';
       //`${this.productUrl}/list`;
    return this.http.get(getUrl)
      .map(res  => {
        return res['data'].docs as Order[];
        
      })*/
//}
  /////////////////////////////////////////
  

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
