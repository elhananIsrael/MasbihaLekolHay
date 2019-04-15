import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from '../services/user.service';
import { OrderService } from 'client/app/services/order.service';
import { default as Order } from '../../models/Order';


@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  ourOrder: Order;
  currentUser = { _id: '', username: '', role: '' };
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private userService: UserService, private orderService: OrderService,
  //constructor(private userService: UserService,
    private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  socialLogin(apiUrl, userData) {
    return this.userService.socialLogin(apiUrl, userData).map(res => res).map(
      res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        return this.loggedIn;
      }
    );
  }

  login(emailAndPassword) {
    return this.userService.login(emailAndPassword).map(res => res.json()).map(
      res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        this.checkIfHaveCurrentOrder();
        return this.loggedIn;
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = { _id: '', username: '', role: '' };
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    delete decodedUser.role;
  }

  checkIfHaveCurrentOrder() {
   /* this.ourOrder.allProductsID = [ '7', '8' ];
    this.ourOrder.date = new Date();
    this.ourOrder.price = 4;
    this.ourOrder.userID = '3';
    this.ourOrder.userName = 'yosef';
*/
    /*var currentOrder2={
    allProductsID: [ '18', '26'],
    date: '20/02/2002',
    userID: '188',
    userName: 'moshe',
    status: 'CURRENT',
    price: 0 };*/
    //console.log(this.ourOrder);
    //this.orderService.addOrder(this.checkIfHaveCurrentOrder.arguments.currentOrder2);
    //.subscribe(

    /*let currentOrder;
    this.orderService.getByIdCurrentOrderOfUser(this.currentUser._id).subscribe(
      data => currentOrder = data,
      error => console.log(error),
    );
    //console.log('vjdlkvjsdlvksj;');
   /* if (!currentOrder) {
    console.log('have not current order');
    }
    console.log('have current order');


   .subscribe(
    data => this.productsList = data,
    error => console.log(error),
    () => this.isLoading = false
  );*/
  }

}
