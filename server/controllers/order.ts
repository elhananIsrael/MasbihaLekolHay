import Order from '../models/order';
import BaseCtrl from './base';

export default class OrderCtrl extends BaseCtrl {
  model = Order;


 // Get by userID all him orders
 getAllOrdersOfUser = (req, res) => {
  this.model.find({ userID: req.params.id }, (err, obj) => {
    if (err) { return console.error(err); }
    res.json(obj);
  });
}


// Get by userID him current order
getCurrentOrderOfUser = (req, res) => {
  this.model.findOne({$and: [ {userID: req.params.id}, {status: 'CURRENT'} ] }, (err, obj) => {
    if (err) { return console.error(err); }
    res.json(obj);
  });
}

/*
createTodo(todo: Order): Observable<Order[]>{
  return this.http.post(`${this.todoUrl}`, todo)
    .map(res  => {
      return res["data"].docs as Order[];
    })
}*/







}
