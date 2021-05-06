const express = require('express');
const router = express.Router();
const MovieModel = require("./../models/Movie");
/* GET home page */
router.get('/', (req, res, next) => res.render('index'));


  router.get("/movies", async (req, res, next) => {
    try {
      const movies = await MovieModel.find();
      console.log(movies);
      res.render("movies.hbs", {
        movies,
      });
    } catch (dbErr) {
      next(dbErr);
    }
  });

  router.get("/movies/:id", function (req, res, next) {
    console.log(req.params.id); // is an object available in any route where you indicate a param name => :name :age :id :bill-order
    // const cat = movies.find((cat) => cat.name === req.params.name);
    // console.log(cat);
  
    MovieModel.findById(req.params.id)
      .then((dbResult) => {
        res.render("movie.hbs", {
          title: "Express",
          movie: dbResult,
        });
      })
      .catch((dbErr) => next(dbErr));
  });

module.exports = router;
