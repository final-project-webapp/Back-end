const express = require('express');
const app = express()
const dotenv = require('dotenv');
var cors = require('cors')
const axios = require('axios');
const port = 3000
app.use(cors())
const req = require('express/lib/request');

require("dotenv").config();

const cors = require('cors');


const corsOptions = {
  origin: 'http://localhost:8000',
  credentials: true,
};
app.use(cors(corsOptions));

const fetchMovies = async (page) => {
  try {
    let result;
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=c9410770f4b61e1b500f64637ab158e5&page=${page}`
      )
      .then((response) => {
        result = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchMoviesId = async (moviesid) => {
  try {
    let result;
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${moviesid}?api_key=c9410770f4b61e1b500f64637ab158e5`
      )
      .then((response) => {
        result = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchMoviesProviders = async (movie_id) => {
  try {
    let result;
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=c9410770f4b61e1b500f64637ab158e5`
      )
      .then((response) => {
        result = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchMoviesReviews = async (movie_id) => {
  try {
    let result;
    await axios
      .get(
        `
        https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=c9410770f4b61e1b500f64637ab158e5`
      )
      .then((response) => {
        result = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  } catch (error) {
    console.error(error);
  }
};

app.get('/movies/:page', async (req, res, next)=>{
  try {
      const {page} = req.query;
      const data = await fetchMovies(req.params.page);

      return res.status(200).json({
        status:200,
        message:  `List of movies found`, 
        data

      })
    } catch (err) {
      return next(err);
    }
})

app.get('/moviesid/:moviesid', async (req, res, next)=>{
  try {
      const {moviesid} = req.query;
      const data = await fetchMoviesId(req.params.moviesid);

      return res.status(200).json({
        status:200,
        message: `movies found`, 
        data

      })
    } catch (err) {
      return next(err);
    }
})

app.get('/moviespro/:movie_id', async (req, res, next)=>{
  try {
      const {movie_id} = req.query;
      const data = await fetchMoviesProviders(req.params.movie_id);

      return res.status(200).json({
        status:200,
        message: `movies found`, 
        data

      })
    } catch (err) {
      return next(err);
    }
})

app.get('/moviesreviews/:movie_id', async (req, res, next)=>{
  try {
      const {movie_id} = req.query;
      const data = await fetchMoviesReviews(req.params.movie_id);

      return res.status(200).json({
        status:200,
        message: `movies found`, 
        data

      })
    } catch (err) {
      return next(err);
    }
})


app.post('/', (req, res) => {
    res.send("Connected correctly to server")
})
app.put('/', (req, res) => {
    res.send('Hello World!')
})
app.delete('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
