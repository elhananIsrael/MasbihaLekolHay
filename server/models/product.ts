import * as mongoose from 'mongoose';
import {url} from 'inspector';

const productSchema = new mongoose.Schema({
  productID: String,
  name: String,
  isAvailable: Boolean,
  price: Number,
  phone: Number,
  address: String,
  url: String
});

const Product = mongoose.model('Product', productSchema);

export default Product;
