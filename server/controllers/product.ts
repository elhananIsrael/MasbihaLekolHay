import Product from '../models/product';
import BaseCtrl from './base';

export default class ProductCtrl extends BaseCtrl {
  model = Product;

// Get by userID all him orders
getAllProductsUploadUser = (req, res) => {
  this.model.find({ makerID: req.params.id }, (err, obj) => {
    if (err) { return console.error(err); }
    res.json(obj);
  });
}

}
