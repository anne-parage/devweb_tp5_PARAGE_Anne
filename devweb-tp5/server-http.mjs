import http from "node:http";

const host = "localhost";
const port = 8000;

import fs from "node:fs/promises";

// function requestListener(_request, response) {
//   response.writeHead(200);
//   response.end("<html><h1>My first server!<h1></html>");
// }

// function requestListener(_request, response) {
//   response.setHeader("Content-Type", "application/json");
//   response.end(JSON.stringify({ message: "I'm OK" }));
// }

// function requestListener(request, response) {

//   fs.readFile('index.html', 'utf8')
//     .then(contents => {
//       response.writeHead(200);
//       response.end(contents);
//     })
//     .catch(err => {
//       console.error(err);
//       response.writeHead(500);
//       response.end('SERVER ERROR'); 
//     });

// }

// async function requestListener(_request, response) {
//   try{
//     const contenu = await fs.readFile("index.html", "utf8")
//     response.setHeader("Content-Type", "text/html");
//     response.writeHead(200);
//     response.end(contenu);
//   } catch(error){
//     console.error(error);
//     response.writeHead(500);
//     response.end("Server ERROR");
//   }
// }

// function requestListener(_request, response) {
//   fs.readFile("index.html", "utf8")
//     .then((contents) => {
//       response.setHeader("Content-Type", "text/html");
//       response.writeHead(200);
//       return response.end(contents);
//     })
//     .catch((error) => console.error(error));
// }

// async function requestListener(request, response) {
//   response.setHeader("Content-Type", "text/html");
//   try {
//     const contents = await fs.readFile("index.html", "utf8");
//     switch (request.url) {
//       case "/index.html":
//         response.writeHead(200);
//         return response.end(contents);
//       case "/random.html":
//         response.writeHead(200);
//         return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
//       default:
//         response.writeHead(404);
//         return response.end(`<html><p>404: NOT FOUND</p></html>`);
//     }
//   } catch (error) {
//     console.error(error);
//     response.writeHead(500);
//     return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
//   }
// }

async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  try {
    const url = request.url.split("/");
    const requests = url[1];  

    switch (requests) {
      case "":
      case "index.html":
        const indexContents = await fs.readFile("index.html", "utf8");
        response.writeHead(200);
        response.end(indexContents);
        break;
      case "random.html":
        const num = parseInt(url[2]); 
        if (!isNaN(num)) {
          const nombre_randoms = Array.from({ length: num }, () => Math.floor(100 * Math.random()));
          response.writeHead(200);
          response.end(`<html><p>${nombre_randoms.join("<br>")}</p></html>`);
        }
        break;
      default:
        response.writeHead(404);
        response.end(`<html><p>404: NOT FOUND</p></html>`);
        break;
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}
const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

