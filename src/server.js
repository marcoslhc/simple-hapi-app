import Hapi from "hapi";
import myPlugin from "./plugin";
async function init() {
  const server = Hapi.server({
    port: process.env.PORT,
    host: "localhost"
  });
  await server.register({
    plugin: myPlugin,
    options: {
      apiUrl: process.env.EXTERNAL_API_URL,
      path: "/personal-boat-shopper",
      parseSearchParams: request => {
        return {
          length: {
            min: {
              value: 9,
              uom: "m"
            },
            max: {
              value: 12,
              uom: "m"
            }
          }
        };
      }
    }
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
