const express = require('express'), http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();

//Express router
app.use('/dishes', dishRouter);
  
  app.get('/dishes/:dishId', (req,res,next) => {
      res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
  });
  
  app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
  });
  
  app.put('/dishes/:dishId', (req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
          ' with details: ' + req.body.description);
  });
  
  app.delete('/dishes/:dishId', (req, res, next) => {
      res.end('Deleting dish: ' + req.params.dishId);
  });

//use morgan for logging
app.use(morgan('dev'))

//use body-parser for json parsing from request body
app.use(bodyParser.json())

//serve static
app.use(express.static(__dirname + '/public'))

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});