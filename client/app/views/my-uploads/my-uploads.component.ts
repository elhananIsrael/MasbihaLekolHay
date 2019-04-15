import { Component, OnInit } from '@angular/core';

import { PRODUCTS } from '../../models/mock-product';

import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ProductService } from '../../services/product.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../shared/services/auth.service';




@Component({
  selector: 'app-my-uploads',
  templateUrl: './my-uploads.component.html',
  styleUrls: ['./my-uploads.component.css']
})
export class MyUploadsComponent implements OnInit {

  product = {};
  productsList = [];
  booleanTypeList = [];
  isLoading = true;
  isEditing = false;


  addProductForm: FormGroup;
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  makerID = new FormControl(this.auth.currentUser._id);
  makerName = new FormControl(this.auth.currentUser.username);
  quantity = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  phone = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  url = new FormControl('', Validators.required);


  constructor(private productService: ProductService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private http: Http,
    public toast: ToastComponent) { }


  ngOnInit() {

    this.getProducts();
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
    });

 /*   this.booleanTypeList.push(
      { value: 1, viewValue: 'TRUE' },
      { value: 2, viewValue: 'FALSE' });
*/
  }



  // getProducts
  getProducts() {
  this.productService.getByIdProductsUploadUser(this.auth.currentUser._id).subscribe(
      data => this.productsList = data,
      error => console.log(error),
      () => this.isLoading = false);
      
    /*  this.productService.getProducts().subscribe(
      data => this.productsList = data,
      error => console.log(error),
      () => this.isLoading = false);
      console.log(this.productsList);*/
  }

  // addProduct
  addProduct(): void {
    this.productService.addProduct(this.addProductForm.value).subscribe(
      res => {
        const newPct = res.json();
        this.productsList.push(newPct);
        this.addProductForm.reset();

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
        });

        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  // enableEditing
  enableEditing(product: any): void {

    /*this.isEditing = true;
    this.product = product;*/
  }


  // deleteProduct
  deleteProduct(product: any): void {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.productService.deleteProduct(product).subscribe(
        res => {
          const pos = this.productsList.map(elem => elem._id).indexOf(product._id);
          this.productsList.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  }

