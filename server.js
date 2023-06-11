//test server

// let testVar = 'test'
// let test= "This is a test"
// let example = "Hi, I'm an example :)"

Here's an example of a basic test server code in JavaScript using the Node.js runtime:

const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, world!');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

This code sets up a simple HTTP server that listens on localhost at port 3000. When a request is received, it sends a response with a 200 status code and the message "Hello, world!".

To run this code, you'll need to have Node.js installed on your machine. Save the code to a file, e.g., server.js, and then run it using the following command in your terminal:


node server.js  // enter this your terminal


After running the command, you should see the message "Server running at http://localhost:3000/" in the console. You can then open your browser and navigate to http://localhost:3000/ to see the "Hello, world!" message displayed.
