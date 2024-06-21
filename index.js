const express = require("express");
const cors = require("cors");
const { connection } = require("./Connection/Connection");
const { MovieRouter } = require("./Routes/Movies.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to server");
});

app.use("/movie", MovieRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
  console.log("Running on Port 8080");
});
