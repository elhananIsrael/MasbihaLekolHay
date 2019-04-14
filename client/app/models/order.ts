import { default as Product } from '../models/product';

enum Status
    {
        DONE,
        CURRENT
    }

export default class Order {

    _id: String;
    name: String;
    allProductsID:  String[];
    date: Date;
    userID: String;
    userName: String;
    status: Status;
    price: Number;

    constructor()
    {
      this._id = '';
      this.name = '';
      this.allProductsID = [];
      this.date = new Date();
      this.userID = '';
      this.userName = '';
      this.status = Status.CURRENT;
      this.price = 0;
    }

}

