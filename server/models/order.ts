import * as mongoose from 'mongoose';
import { default as  Product } from './product';

const orderSchema = new mongoose.Schema({
  name: String,
  allProductsID:  [{
    type: Product
}],
  date: Date,
  userID: String,
  userName: String,
  status: {
    type: String,
    enum : ['CANCELED', 'DONE', 'CURRENT'],
    default: 'CURRENT'
          },
  price: Number,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
