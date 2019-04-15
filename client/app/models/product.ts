export default class Product {

  _id: String;
  name: String;
  description: String;
  makerID: String;
  makerName: String;
  quantity: Number;
  price: Number;
  phone: String;
  address: String;
  url: String;

  constructor() {
    this._id = '';
    this.name = '';
    this.description = '';
    this.makerID = '';
    this.makerName = '';
    this.quantity = 1;
    this.price = 0;
    this.phone = '';
    this.address = '';
    this.url = '';
  }

}
