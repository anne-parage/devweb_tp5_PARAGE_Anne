// import express from "express";
// import morgan from "morgan";

// const host = "localhost";
// const port = 8000;

// const app = express();

// app.use(express.static("static"));
// app.set("view engine", "ejs")

// app.get(["/", "/index.html"], async function (request, response, next) {
//   response.sendFile("index.html", { root: "./" });
// });

// app.get("/random/:nb", async function (request, response, next) {
//   const length = request.params.nb;
//   const contents = Array.from({ length })
//     .map((_) => `<li>${Math.floor(100 * Math.random())}</li>`)
//     .join("\n");
//   return response.send(`<html><ul>${contents}</ul></html>`);
// });


// app.get("/random/:nb", async function (request, response, next) {
//   const length = request.params.nb;
//   const numbers = Array.from({ length }).map((_) => Math.floor(100 * Math.random()));
//   const welcome = "Bienvenue sur la page aléatoire !";

//   response.render("random", { numbers, welcome });
// });


// app.listen(port, host);

// const server = app.listen(port, host);

// server.on("listening", () =>
//   console.info(
//     `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
//   ),
// );

// console.info(`File ${import.meta.url} executed.`);

// Question 2.7
// import express from "express";
// import morgan from "morgan";
// import createError from "http-errors"; // Importez le module http-errors

// const host = "localhost";
// const port = 8000;

// const app = express();

// app.use(express.static("static"));
// app.set("view engine", "ejs");


// app.get(["/", "/index.html"], async function (request, response, next) {
//   response.sendFile("index.html", { root: "./" });
// });

// app.get("/random/:nb", async function (request, response, next) {
//   const length = Number.parseInt(request.params.nb, 10);

//   if (Number.isNaN(length)) {
//     return next(createError(400, "Le paramètre nb doit être un nombre."));
//   }

//   const numbers = Array.from({ length }).map((_) => Math.floor(100 * Math.random()));
//   const welcome = "Bienvenue sur la page aléatoire !";

//   response.render("random", { numbers, welcome });
// });

// app.use((request, response, next) => {
//   concole.debug(`default route handler : ${request.url}`);
//   return next(createError(404));
// });

// app.use((error, _request, response, _next) => {
//   concole.debug(`default error handler: ${error}`);
//   const status = error.status ?? 500;
//   const stack = app.get("env") === "development" ? error.stack : "";
//   const result = { code: status, message: error.message, stack };
//   return response.render("error", result);
// });

// app.listen(port, host);

// console.info(`File ${import.meta.url} executed.`);

// Apres la question 2.7
import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import path from "path";
import logger from "loglevel"; // Importez le module loglevel

logger.setLevel(logger.levels.DEBUG); // Définissez le niveau de verbosité sur DEBUG

const host = "localhost";
const port = 8000;

const app = express();

app.use(express.static("static"));
app.set("view engine", "ejs");

app.get(["/", "/index.html"], async function (request, response, next) {
  response.sendFile("index.html", { root: "./" });
});

app.get("/random/:nb", async function (request, response, next) {
  const length = Number.parseInt(request.params.nb, 10);

  if (Number.isNaN(length)) {
    return next(createError(400, "Le paramètre nb doit être un nombre."));
  }

  const numbers = Array.from({ length }).map((_) => Math.floor(100 * Math.random()));
  const welcome = "Bienvenue sur la page aléatoire !";

  response.render("random", { numbers, welcome });

  logger.debug("Page /random/:nb a été rendue avec succès.");
});

app.use((req, res, next) => {
  res.status(404).render("errors/404");

  logger.warn("Page non trouvée : 404");
});


app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).render("error", {
    code: err.status || 500,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });


  logger.error(`Erreur ${err.status || 500}: ${err.message}`);
});


app.set("views", path.join(__dirname, "views"));

const server = app.listen(port, host);

server.on("listening", () =>
  logger.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  ),
);

console.info(`File ${import.meta.url} executed.`);
