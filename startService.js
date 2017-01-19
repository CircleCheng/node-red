var http = require('http');
var RED = require('node-red');
var express = require('express');
var app = express();

const port = '8888';

app.use('/', function(req, res, next) {
  console.log('APP receive request ...');
   next();
});


  /**
   * Create HTTP server.
   */

  var server = http.createServer(app).listen(process.env.PORT || port);

var settings = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/noderedapi",
    userDir:"/home/nol/.nodered/",
    functionGlobalContext: { },    // enables global context
    menu: { // Hide unwanted menu items by id. see editor/js/main.js:loadEditor for complete list
        "menu-item-import-library": false,
        "menu-item-export-library": false,
        "menu-item-keyboard-shortcuts": false,
        "menu-item-help": {
            label: "Alternative Help Link Text",
            url: "http://example.com"
        }
    },
    editorTheme: {
      userMenu: false
    }
};

RED.init(server,settings);
app.use(settings.httpAdminRoot,RED.httpAdmin);
app.use(settings.httpNodeRoot,RED.httpNode);
RED.start();

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.on('error', onError);
  server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  console.error('[init][onError] bin/www server ERROR =' + error);

  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error('[init] '+ bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('[init] '+ bind + ' is already in use');
      process.exit(1);
      break;
    default:
      //throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('[init] Listening on ' + bind);
}  
