// console.log("This is coming from NodeJS which is a javascript runtime");
// console.log(`4 Popular HTTP Verbs:

//  1. GET = GET Some Data
//  2.POST = POST/CREATE Some Data
//  3.DELETE = DELETE Some Data
//  4.PUT = PUT Some Data

// CRUD = Create, Read, Update, Delete `);

//to get packages here http is a package name in require and var http is a variable to catch a package
// var http = require("http");

// http
//   .createServer(function (req, res) {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     // res.write("This is coming from the new server we created");
//     res.end("This is coming from the NodeMon we created");
//   })
//   .listen(4000);

// const NameOfStudent = "Vedansh";

// module.exports = NameOfStudent; //module.export is way of exporting module or variable in Node

const http = require("http"); //require is to import library or package

// var variableName = require("../index.js");

// var ImportedFromIndex = require("../index.js");

// console.log(ImportedFromIndex);

const app = require("./src/app.js");

const PORT = process.env.PORT || 4000;

// http
//   .createServer(function (req, res) {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     // res.write("This is coming from the new server we created");
//     res.end("This is coming from source folder");
//   })
//   .listen(PORT);  //listen takes 2 arguments one is port and 2 ns is call back function

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
