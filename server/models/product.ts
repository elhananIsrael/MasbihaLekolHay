import * as mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productID: String,
  name: String,
  description: String,
  quantity: Number,
  isAvailable: Boolean,
  price: Number,
  phone: Number,
  address: String,
  url: String
});

const Product = mongoose.model('Product', productSchema);

export default Product;
