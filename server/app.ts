import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as formidable from 'formidable';
import * as fs from 'fs';
import * as socketIo from 'socket.io';


import setRoutes from './routes';

const app = express();
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
(<any>mongoose).Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  setRoutes(app);

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  const server = app.listen(app.get('port'), () => {
    console.log('masbiha_lekol_hay listening on port ' + app.get('port'));
  });

  const io = require('socket.io').listen(server);

//#region Chat

var usersCollection = [];

// Express routes
app.set("view engine", "vash");

app.use("/chatUploads", express.static(path.join(__dirname, 'Uploads')));

app.get("*",function(req, res){
  res.render("index");
});

app.post("/listFriends",function(req, res){
  var clonedArray = usersCollection.slice();

  // Getting the userId from the request body as this is just a demo 
  // Ideally in a production application you would change this to a session value or something else
  var i = usersCollection.findIndex(x => x.participant.id == req.body.userId);

  clonedArray.splice(i,1);

  res.json(clonedArray);
});

app.post('/chatUploadFile', function (req, res){
  let form = new formidable.IncomingForm();
  let ngChatDestinataryUserId;

  if (!fs.existsSync("/chatUploads")){
    fs.mkdirSync("/chatUploads");
  }
  
  form.parse(req)
  .on('field', function (name, field) {
    // You must always validate this with your backend logic
    if (name === 'ng-chat-participant-id')
      ngChatDestinataryUserId = field;
  })
  .on('fileBegin', function (name, file){
      file.path = `${__dirname}/chatUploads/${file.name}`;
  })
  .on('file', function (name, file){
    console.log('Uploaded ' + file.name);

    // Push socket IO status
    let message = {
      type: 2, // MessageType.File = 2
      //fromId: ngChatSenderUserId, fromId will be set by the angular component after receiving the http response
      toId: ngChatDestinataryUserId,
      message: file.name,
      mimeType: file.type,
      fileSizeInBytes: file.size,
      downloadUrl:  `http://localhost:4200/chatUploads/${file.name}`
    };

    console.log("Returning file message:");
    console.log(message);

    res.status(200);
    res.json(message);
  });
});

// Socket.io operations
io.on('connection', function(socket){
  console.log('A user has connected to the server.');

  socket.on('join', function(username) {
    // Same contract as ng-chat.User
    usersCollection.push({
        participant: {
            id: socket.id, // Assigning the socket ID as the user ID in this example
            displayName: username,
            status: 0, // ng-chat UserStatus.Online,
            avatar: null
        }
    });

    socket.broadcast.emit("friendsListChanged", usersCollection);

    console.log(username + " has joined the chat room.");

    // This is the user's unique ID to be used on ng-chat as the connected user.
    socket.emit("generatedUserId", socket.id);

    // On disconnect remove this socket client from the users collection
    socket.on('disconnect', function() {
      console.log('User disconnected!');

      var i = usersCollection.findIndex(x => x.participant.id == socket.id);
      usersCollection.splice(i, 1);

      socket.broadcast.emit("friendsListChanged", usersCollection);
   });
  });

  socket.on("sendMessage", function(message){
    console.log("Message received:");
    console.log(message);

    console.log(usersCollection.find(x => x.participant.id == message.fromId));

    io.to(message.toId).emit("messageReceived", {
      user: usersCollection.find(x => x.participant.id == message.fromId).participant,
      message: message
    });

    console.log("Message dispatched.");
  });
});

//#endregion Chat
});

export { app };
