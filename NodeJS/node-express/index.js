const express = require('express'), http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();

//serve static
app.use(express.static(__dirname + '/public'))

//Express dishRouter
app.use('/dishes', dishRouter);

//Express promoRouter
app.use('/promotions', promoRouter)

//Express leaderRouter
app.use('/leaders', leaderRouter)
  
//use morgan for logging
app.use(morgan('dev'))

//use body-parser for json parsing from request body
app.use(bodyParser.json())

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});