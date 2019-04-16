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

/*
// Update by id
updateProductInCurrentUser = (req, res) => {
  this.model.findOneAndUpdate( {_id: req.params.id},
  //  {$and: [ {userID: req.params.id}, {status: 'CURRENT'} ] },
      { '$push': { 'allProductsID': req.body } }, (err)  => {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
}
*/
/*
// create todo and send back all todos after creation
router.post('/, async (req, res) => {
  try {
      // create a todo, information comes from request from Angular
      await ToDo.CREATE(req.body.text);
      res.json(await ToDo.REQUEST()); // return all todos in JSON format
  } catch (err) {
      res.send(err);
  }
});*/



// Get by userID him current order
getCurrentOrderOfUser = (req, res) => {
  this.model.findOne({$and: [ {userID: req.params.id}, {status: 'CURRENT'} ] }, (err, obj) => {
    // console.log('wwwww: ' +obj)
    // if (obj == null) {
    //   obj = new Order;
    // }
    // console.log('wwwww: ' +obj)
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
