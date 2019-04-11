import { Component, OnInit } from '@angular/core';

import { PRODUCTS } from '../models/mock-product';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  productsList = PRODUCTS;

  constructor() { }

  ngOnInit() {
  }

}


