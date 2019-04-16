import * as mongoose from 'mongoose';
import { default as Product } from './product';

const orderSchema = new mongoose.Schema({
  //name: String,
  allProductsID: [{
    type: String
  }],
  date: Date,
  userID: String,
  userName: String,
  status: {
    type: String,
    enum: ['DONE', 'CURRENT'],
    default: 'CURRENT'
  },
  price: Number
});


orderSchema.statics.CREATE = async function(order) {
  return this.create({
    allProductsID:  order[0],
    date: order[1],
    userID: order[2],
    userName: order[3],
    status: order[4],
    price: order[5]
  });
}

const Order = mongoose.model('Order', orderSchema);

export default Order;
