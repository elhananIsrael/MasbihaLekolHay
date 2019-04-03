# משביע לכל חי-Masbiha Lekol Hay
.מהווה פלטפורמה לחיבור בין אנשים וחברות אשר יש להם מזון שלא נצרך להם לבין אנשים או חברות שמעוניינים בקבלת המזון

Is a platform for connecting people and companies that have food that they do not need and people or companies interested in receiving food.
/
/
/
/
/
This project uses the [MEAN stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle)):
* [**M**ongoose.js](http://www.mongoosejs.com) ([MongoDB](https://www.mongodb.com)): database
* [**E**xpress.js](http://expressjs.com): backend framework
* [**A**ngular 6](https://angular.io): frontend framework
* [**N**ode.js](https://nodejs.org): runtime environment

Other tools and technologies used:
* [Angular CLI](https://cli.angular.io): project scaffolding
* [Bootstrap4](https://getbootstrap.com/docs/4.0/getting-started/introduction/): layout and styles
* [Angular Material](https://material.angular.io): frontend framework
* [Font Awesome](http://fontawesome.io): icons
* [ng2-toastr](https://github.com/PointInside/ng2-toastr): toastr
* [JSON Web Token](https://jwt.io): user authentication
* [Angular JWT](https://github.com/auth0/angular2-jwt/tree/v1.0): JWT helper for Angular
* [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js): password encryption

## Prerequisites
1. Install [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com)
2. Install Angular CLI: `npm i -g @angular/cli`
3. From project root folder install all the dependencies: `npm i`

## RUN
1. Run `mongod` and `mongo` serices (If you get any error like connection faild, just create the folder C:\data\db)
2. `npm run dev`: concurrently execute MongoDB, Angular build, TypeScript compiler and Express server.
3. `npm run prod`: run the project with a production bundle and AOT compilation
