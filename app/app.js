
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var gpio = require("pi-gpio");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


/////// GLOBALS ///////
var led_state = false;

/////// INIT ///////
//make sure output pin 16 is initialized to off
gpio.open(16, "output", function(err) {     // Open pin 16 for output
	gpio.write(16, 0, function() {          // Set pin 16 high (1)
        gpio.close(16);                     // Close pin 16
    });
});

//toggle the led state when this url is triggered
app.get('/toggle', function(req, res){
	led_state = !led_state;

	gpio.open(16, "output", function(err) {     // Open pin 16 for output
    	gpio.write(16, led_state, function() {          // Set pin 16 high (1)
        	gpio.close(16);                     // Close pin 16
    	});
	});
	res.send(200);
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
