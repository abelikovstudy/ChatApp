const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler  = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const db = require("./model/rolesSequaliser");
const Role = db.role;
global.io = io;
const PORT = process.env.PORT || 3500;

/* DB Segment remove for prod */
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    Role.create({
        id: 1,
        name: "user"
      });
     
      Role.create({
        id: 2,
        name: "moderator"
      });
     
      Role.create({
        id: 3,
        name: "admin"
      });
  });
/* DB Segment remove for prod */ 

app.use(express.urlencoded({extended: false}));
//app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/public')));



app.use('/',require('./routes/root'));
app.use('/login', require('./routes/login'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/newUser', require('./routes/api/newUser'));
app.use('/api/test', require('./routes/api/test'))
app.use('/register', require('./routes/register'));
app.use('/chat', require('./routes/chat'))
//
app.use('*', require('./routes/404'));


//error handler
app.use(errorHandler)


server.listen(PORT, () => console.log(`Running on ${PORT}`));
