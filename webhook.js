// This example uses Express to receive webhooks
const app = require("express")();
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;
process.env.SECRET_HASH = "TESTRAVE"

var winston = require('winston');
require('winston-loggly-bulk');
 
 winston.add(winston.transports.Loggly, {
    token: "74d1c06e-ac3c-4fb5-87ca-018afe2f3153",
    subdomain: "anjolabassey",
    tags: ["Winston-NodeJS"],
    json:true
});

app.get('/', (request, response) => res.send('Hello World!'))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post("/ghmobile", function(request, response) {
  /* It is a good idea to log all events received. Add code *
 * here to log the signature and body to db or file       */
  
  // retrieve the signature from the header
  var hash = req.headers["HTTP_VERIF_HASH"];
  
  if(!hash) {
  	// discard the request,only a post with rave signature header gets our attention 
  }
  
  // Get signature stored as env variable on your server
  const secret_hash = process.env.MY_HASH;
  
  // check if signatures match
  
  if(hash !== secret_hash) {
   // silently exit, or check that you are passing the write hash on your server.
  }
  
  // Retrieve the request's body
  var request_json = request.body;

  // Give value to your customer but don't give any output
// Remember that this is a call from rave's servers and 
// Your customer is not seeing the response here at all

  winston.log(request_json);
  console.log(request_json)
  response.send(200);
  
  
});

app.listen(port, () => {
    console.log('App listening on port %d', port);
});