import * as express from 'express';

import UserCtrl from './controllers/user';
import EmployeeCtrl from './controllers/employee';
import AttendanceCtrl from './controllers/attendance';
import ProductCtrl from './controllers/product';
import OrderCtrl from './controllers/order';


import User from './models/user';
import Employee from './models/employee';
import Attendance from './models/attendance';
import Product from './models/product';
import Order from './models/order';


export default function setRoutes(app) {

  const router = express.Router();

  const employeeCtrl = new EmployeeCtrl();
  const attendanceCtrl = new AttendanceCtrl();
  const userCtrl = new UserCtrl();
  const productCtrl = new ProductCtrl();
  const orderCtrl = new OrderCtrl();


  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/google_login').post(userCtrl.googleLogin);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Employee
  router.route('/employees').get(employeeCtrl.getAll);
  router.route('/employees/count').get(employeeCtrl.count);
  router.route('/employee').post(employeeCtrl.insert);
  router.route('/employee/:id').get(employeeCtrl.get);
  router.route('/employee/:id').put(employeeCtrl.update);
  router.route('/employee/:id').delete(employeeCtrl.delete);

  // Attendaces
  router.route('/attendances').get(attendanceCtrl.getAll);
  router.route('/attendances/count').get(attendanceCtrl.count);
  router.route('/attendance').post(attendanceCtrl.insert);
  router.route('/attendance/:id').get(attendanceCtrl.get);
  router.route('/attendance/:id').put(attendanceCtrl.update);
  router.route('/attendance/:id').delete(attendanceCtrl.delete);

   // Products
   router.route('/products').get(productCtrl.getAll);
  router.route('/products/count').get(productCtrl.count);
  router.route('/product').post(productCtrl.insert);
  router.route('/product/:id').get(productCtrl.get);
  router.route('/product/:id').put(productCtrl.update);
  router.route('/product/:id').delete(productCtrl.delete);

    // Orders
    router.route('/orders').get(orderCtrl.getAll);
    router.route('/orders/count').get(orderCtrl.count);
    router.route('/order').post(orderCtrl.insert);
    router.route('/order/:id').get(orderCtrl.get);
    router.route('/order/:id').put(orderCtrl.update);
    router.route('/order/:id').delete(orderCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
