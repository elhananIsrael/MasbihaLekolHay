import * as express from 'express';

import UserCtrl from './controllers/user';
import ProductCtrl from './controllers/product';
import OrderCtrl from './controllers/order';
import PostCtrl from './controllers/post';

import User from './models/user';
import Product from './models/product';
import Order from './models/order';
import Post from './models/post'


export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();
  const productCtrl = new ProductCtrl();
  const orderCtrl = new OrderCtrl();
  const postCtrl = new PostCtrl();


  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/google_login').post(userCtrl.googleLogin);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  //blogs
  router.route('/posts').get(postCtrl.getAll);
  router.route('/post').post(postCtrl.insert);
  router.route('/post/:id').get(postCtrl.get);

   // Products
   router.route('/products').get(productCtrl.getAll);
  router.route('/products/count').get(productCtrl.count);
  router.route('/product').post(productCtrl.insert);
  router.route('/product/:id').get(productCtrl.get);
  router.route('/product/:id').put(productCtrl.update);
  router.route('/product/:id').delete(productCtrl.delete);
  router.route('/productsUploadUser/:id').get(productCtrl.getAllProductsUploadUser);


    // Orders
    router.route('/orders').get(orderCtrl.getAll);
    router.route('/orders/count').get(orderCtrl.count);
    router.route('/order').post(orderCtrl.insert);
    router.route('/order/:id').get(orderCtrl.get);
    router.route('/order/:id').put(orderCtrl.update);
    router.route('/order/:id').delete(orderCtrl.delete);
    router.route('/ordersOfUser/:id').get(orderCtrl.getAllOrdersOfUser);
    router.route('/currentOrderOfUser/:id').get(orderCtrl.getCurrentOrderOfUser);


  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
