import { Component, OnInit } from '@angular/core';

import { PRODUCTS } from '../models/mock-product';
import { default as Order } from '../models/Order';


import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ProductService } from '../services/product.service';
import { OrderService } from '../services/order.service';

import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../shared/services/auth.service';



@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

 // productsList = PRODUCTS;
  productsList = [];
  currentOrder: Order;

  constructor(private productService: ProductService,  private orderService: OrderService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private http: Http,
    public toast: ToastComponent) { }


    product = {};
   // productsList = [];
   // booleanTypeList = [];
    isLoading = true;
   // isEditing = false;
  

  ngOnInit() {

    this.getAllProducts();
    this.getCurrentOrder();
    console.log('wwwww: ' + JSON.stringify(this.currentOrder));
    }




  // addProductToMyCart
  
  addProductToMyCart(productID: any): void {
    if(!this.auth.loggedIn)
    {
      this.toast.setMessage('You need login first.', 'success');

    } else {

      this.orderService.getByIdCurrentOrderOfUser(this.auth.currentUser._id).subscribe(
        res => {
          this.currentOrder = res.json();
          if(!this.currentOrder)
          {this.orderService.addOrder(
             {
              'allProductsID' : [ ],
              'date' : new Date(),
              'userID' : this.auth.currentUser._id,
              'userName' : this.auth.currentUser.username,
              'status' : 'CURRENT',
              'price' : 0
          }
          )}
          this.currentOrder.allProductsID.push(productID);
          this.orderService.editOrder(this.currentOrder);
        //  this.productsList.push(newPct);
         // this.addProductForm.reset();
  /*
        this.addProductForm = this.formBuilder.group({
            name: this.name,
            description: this.description,
            makerID: this.auth.currentUser._id,
            makerName: this.auth.currentUser.username,
            quantity: this.quantity,
            price: this.price,
            phone: this.phone,
            address: this.address,
            url: this.url,
          });*/
  
          this.toast.setMessage('item added to your cart successfully.', 'success');
        },
        error => console.log(error)
      );

    }

   /* console.log('start adding to my cart');
    if (this.auth.loggedIn) {
    this.currentOrder.allProductsID.push(productID);
    this.orderService.editOrder(this.currentOrder).subscribe(
        res => this.toast.setMessage('item added to your cart successfully.', 'success'),
        error => console.log(error)
      );
    } else { this.toast.setMessage('Please login.', 'success'); }
    */
  }


// getAllProducts
getAllProducts() {
  this.productService.getProducts().subscribe(
    data => this.productsList = data,
    error => console.log(error),
    () => this.isLoading = false
  );
}

getCurrentOrder(){
  this.orderService.getByIdCurrentOrderOfUser(this.auth.currentUser._id).subscribe(
    data => this.currentOrder = data,
    error => console.log(error),
    () => this.isLoading = false
  );
}



}


