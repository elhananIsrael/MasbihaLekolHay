import { Component, OnInit } from '@angular/core';

import { PRODUCTS } from '../../models/mock-product';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  productsList = PRODUCTS;

  constructor() { }

  ngOnInit() {
  }

/*
    // enableEditing
    enableEditing(employee: any): void {

    }
  
    // delete employee
    deleteEmployee(employee: any): void {
      if (window.confirm('Are you sure you want to permanently delete this item?')) {
        this.employeeService.deleteEmployee(employee).subscribe(
          res => {
            const pos = this.employeeList.map(elem => elem._id).indexOf(employee._id);
            this.employeeList.splice(pos, 1);
            this.toast.setMessage('item deleted successfully.', 'success');
          },
          error => console.log(error)
        );
      }
    }
    */

}
