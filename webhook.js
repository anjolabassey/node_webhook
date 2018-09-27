// This example uses Express to receive webhooks
var app = require("express")();
var expressWinston = require('express-winston');
var winston = require('winston');
var {Loggly} = require('winston-loggly-bulk');

var bodyParser = require('body-parser');
var port = process.env.PORT || 4000;
process.env.SECRET_HASH = "TESTRAVE";
expressWinston.requestWhitelist.push('body');

app.use(expressWinston.logger({
  transports: [
      new winston.transports.Console({
          json: true,
          colorize: true
      }),
      
      winston.add(new Loggly({
          subdomain: 'anjolabassey',
          inputToken: '74d1c06e-ac3c-4fb5-87ca-018afe2f3153',
          json: true,
          tags: ["NodeJS-Express"]
      }))
  ]
}));


app.get('/', function (request, response) {
  response.send('Hello World!');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/ghmobile", function (request, response) {
  /* It is a good idea to log all events received. Add code *
  * here to log the signature and body to db or file       */

  // retrieve the signature from the header
  var hash = req.headers["verif-hash"];

  if (!hash) {
    response.send({status:"failed"});
  process.exit(0);
  }
  // discard the request,only a post with rave signature header gets our attention 
  

  // Get signature stored as env variable on your server
  var secret_hash = process.env.SECRET_HASH;

  // check if signatures match

  if (hash !== secret_hash) {
    response.send({status:"failed"});
    process.exit(0);
  }
  // silently exit, or check that you are passing the write hash on your server.
  

  // Retrieve the request's body
  var request_json = request.body;

  // Give value to your customer but don't give any output
  // Remember that this is a call from rave's servers and 
  // Your customer is not seeing the response here at all

  winston.log(request_json);
  console.log(request_json);
  response.status(200).send({status:"success"});
});

app.listen(port, function () {
  console.log('App listening on port ' + port);
});