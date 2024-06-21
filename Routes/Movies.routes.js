const { Router } = require("express");
const { MovieModel } = require("../Model/Movie.model");

const MovieRouter = Router();

MovieRouter.get("/", async (req, res) => {
  try {
    const moviedata = await MovieModel.find();
    res.send(moviedata);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//get data by id
MovieRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const movieData = await MovieModel.findById(id);
    res.send(movieData);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Add movie Data
MovieRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    const addData = new MovieModel(data);
    await addData.save();
    res.send({ message: "Movie Data Created Successfully", addData });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

MovieRouter.put("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updateMovie = await MovieModel.findByIdAndUpdate(id, data);
    res.send({ message: "Update Movie", updateMovie });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

MovieRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteMovie = await MovieModel.findByIdAndDelete(id);
    res.send({ message: "Delete Movie", deleteMovie });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// get all data where watchStatus = true
MovieRouter.get("/watchlist", async (req, res) => {
  try {
    const watchStatusData = await MovieModel.find({ watchStatus: true });
    res.send(watchStatusData);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// update watchstatus
MovieRouter.patch("/:id/watchstatus", async (req, res) => {
  try {
    const id = req.params.id;
    const updatewatchStatus = await MovieModel.findById(id);
    if (!updatewatchStatus) {
      res.send("Movie Not Found");
    }
    updatewatchStatus.watchStatus = req.body.watchStatus;
    await updatewatchStatus.save();
    res.send({ message: "Update WatchStatus", updatewatchStatus });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

MovieRouter.patch("/:id/review", async (req, res) => {
  try {
    const id = req.params.id;
    const movies = await MovieModel.findById(id);
    if (!movies) {
      res.send("Movie Not Found");
    }
    movies.rating = req.body.rating;
    movies.reviews = req.body.reviews;
    await movies.save();
    res.send({ message: "Update Review and Rating", movies });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = {
  MovieRouter,
};
