const express = require("express");
const app = express();
const port = 3000;

const path = require("path");

//Calling Routers

const homeRoute = require("./routers/home");
const loginRoute = require("./routers/login");
const routerLogic = require("./routerLogic");

//Get

app.get("/", (req, res) => {
  res.status(200);
  res.send("Successfully working!");
});

app.get("/hello", (req, res) => {
  res.set("Content-Type", "text/html");
  res.status(200).send("<h1>Hello GFG Learner!</h1>");
});

// Send data
app.use(express.json());
app.post("/send", (req, res) => {
  const { name } = req.body;
  if (name === undefined || name === null) {
    res
      .status(400)
      .send("Error: Please ensure that you fill name parameter correctly!");
  }
  res.status(200).send(`Welcome ${name}`);
});

// Serve Static Files
app.use("/static", express.static(path.join(__dirname, "static-files")));

app.listen(port, (error) => {
  if (!error) {
    console.log("Server is running so that theres no problem :)");
  } else {
    console.log("Server cannot start!", error);
  }
});

// Sending Files

app.get("/file", (req, res) => {
  res.sendFile(path.join(__dirname, "static-files/image1.jpg"));
});

// Call Routers here

app.use("/", homeRoute);
app.use("/", loginRoute);

// Middleware logic

// Middleware 1: Log request method and URL
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// Middleware 2: Add a custom header
app.use((req, res, next) => {
  res.setHeader("X-Custom-Header", "Middleware Chaining Example");
  next();
});

// Route handler
app.get("/middleware", (req, res) => {
  res.send("Hello, World!");
});

app.use("/test", routerLogic);
