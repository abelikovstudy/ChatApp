const express = require('express');
const events = require('events');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler  = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

    
app.use(express.urlencoded({extended: false}));
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '/public')));



app.use('/', require('./routes/root'));
app.use('/login', require('./routes/login'));
app.use('/auth', require('./routes/auth'));
app.use('/newUser', require('./routes/newUser'));
app.use('/register', require('./routes/register'));
app.use('/chat', require('./routes/chat'))
app.use('*', require('./routes/404'));


//error handler
app.use(errorHandler)

app.listen(PORT, () => console.log(`Running on ${PORT}`));