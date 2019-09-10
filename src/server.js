import Hapi from "hapi";

async function init() {
  const server = Hapi.server({
    port: 8080,
    host: "localhost"
  });

  await server.start();
  console.log(`Server Running on ${server.info.uri}`);
}

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
// var http = require("http");

// //create a server object:
// http
//   .createServer(function(req, res) {
//     res.write("Hello World!"); //write a response to the client
//     res.end(); //end the response
//   })
//   .listen(8080); //the server object listens on port 8080
