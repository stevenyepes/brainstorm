var express = require('express'),
    http = require('http'),
    path = require('path'),
    config = require('./server/config');


// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

// Configuracion de express
require('./server/config/express')(app);
// Configuracion de las rutas
require('./server/routes')(app);

console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);

// Permitir conecciones desde otros puertos
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var server = http.createServer(app).listen(process.env.PORT || 8080, function() {
  console.log('Listening on port ' + (process.env.PORT || 8080));
});

// Configuracion de redis y sockets
var io = require('socket.io')(server, {'transports': ['websocket', 'polling']});
var redis = require('socket.io-redis');

// Chequear si se esta corriendo dentro de Docker o en local
io.adapter(redis({ host: 'redis', port: 6379 }));
/*if(process.env.REDIS_PORT_6379_TCP_ADDR != 'undefined') {
  io.adapter(redis({ host: 'redis', port: 6379 }));
}*/

io.sockets.on('connection', function(socket) {
  socket.on('message', function(data) {
    socket.broadcast.emit('message', data);
  });

  socket.on('add-customer', function(customer) {
    io.emit('notification', {
      message: customer.message,
      customer: customer.name
    });
  });


  socket.on('add-design-task', function(task) {
    io.emit('design-task-added', {
      message: 'new task',
      task: task
    });
  });

  socket.on('add-architecture-task', function(task) {
    io.emit('architecture-task-added', {
      message: 'new task',
      task: task
    });
  });

  socket.on('add-test-task', function(task) {
    io.emit('test-task-added', {
      message: 'new task',
      task: task
    });
  });


});




// Expose app
exports = module.exports = app;
