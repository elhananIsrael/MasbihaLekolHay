import * as mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  makerID: String,
  makerName: String,
  quantity: Number,
  isAvailable: Boolean,
  price: Number,
  phone: String,
  address: String,
  url: String
});

const Product = mongoose.model('Product', productSchema);

export default Product;
