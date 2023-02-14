const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
const dotenv = require("dotenv");
const functions = require("firebase-functions");

dotenv.config();

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("./controllers/todoController");

//App config
const app = express();

//const port = process.env.PORT || 5000;
const port = 3000;

const connectionURL = process.env.MONGO_URI;
//Middlewares
//Convert to json
app.use(express.json());
app.use(Cors());

//DB Config
mongoose
  .connect(connectionURL)
  .then(() => {
    app.listen(port, () => console.log(`Running on port: ${port}`));
  })
  .catch((err) => console.log(err));

//API Endpoints

//Get todos List
app.get("/todos", getTodos);

//Create a new Todo
app.post("/todos", createTodo);

//Update a Todo
app.put("/todos/:id", updateTodo);

//Delete a Todo
app.delete("/todos/:id", deleteTodo);

exports.api = functions.https.onRequest(app);