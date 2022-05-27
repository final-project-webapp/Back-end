const express = require('express');
const app = express()
const dotenv = require('dotenv');

const axios = require('axios');
const port = 3000

const req = require('express/lib/request');

require("dotenv").config();

const cors = require('cors');


const corsOptions = {
  origin: 'https://frontend-final.azurewebsites.net',
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
        `https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=c9410770f4b61e1b500f64637ab158e5`
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

const fetchMoviesSearch = async (movie_name) => {
  try {
    let result;
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=c9410770f4b61e1b500f64637ab158e5&language=en-US&page=1&query=${movie_name}`
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

      return res.status(200).json({message:  `List of movies found`, data})
    } catch (err) {
      return next(err);
    }
})

app.get('/moviesid/:moviesid', async (req, res, next)=>{
  try {
      const {moviesid} = req.query;
      const data = await fetchMoviesId(req.params.moviesid);
      if(data != null){return res.json(data)}
      else{return res.json({status:404, message: "Can't find the movie that you're looking for", data: "none"})}
    } catch (err) {
      return next(err);
    }
})

app.get('/moviesprous/:movie_id', async (req, res, next)=>{
  try {
      const {movie_id} = req.query;
      const data = await fetchMoviesProviders(req.params.movie_id);
      if(data.results.US != null){
        if(data.results.US.flatrate != null)
        {return res.json(data)}
        else{return res.json({status:404, message: "Not Availavle", data: "none"})}
      }
      else{return res.json({status:404, message: "Not Availavle", data: "none"})}
    } catch (err) {
      return next(err)
    }
})

app.get('/moviesproth/:movie_id', async (req, res, next)=>{
  try {
      const {movie_id} = req.query;
      const data = await fetchMoviesProviders(req.params.movie_id);
      if(data.results.TH != null){
        if(data.results.TH.flatrate != null)
        {return res.json(data)}
        else{return res.json({status:404, message: "Not Availavle", data: "none"})}
      }
      
      else{return res.json({status:404, message: "Not Availavle", data: "none"})}
    } catch (err) {
      return next(err)
    }
})

// app.get('/moviespro/:movie_id', async (req, res, next)=>{
//   try {
//       const {movie_id} = req.query;
//       const data = await fetchMoviesProviders(req.params.movie_id);
//         return res.json(data)
//     } catch (err) {
//       return next(err)
//     }
// })

app.get('/moviesreviews/:movie_id', async (req, res, next)=>{
  try {
      const {movie_id} = req.query;
      const data = await fetchMoviesReviews(req.params.movie_id);

      return res.status(200).json({
        message: `movies reviews found`, 
        data

      })
    } catch (err) {
      return next(err);
    }
})
app.get('/moviessearch/:movie_name', async (req, res, next)=>{
  try {
      const data = await fetchMoviesSearch(req.params.movie_name);
      return res.status(200).json({
        message: `movies found`, 
        data
      })
    } catch (err) {
      return next(err);
    }
})

// app.post('/formdatausersupload', loginValidation, multerSigleUpload.single('image'), function (req, res) {
//   console.log('file received');
//   console.log(req);
//   var asd = "SELECT emailaddress FROM user where emailaddress = '" + req.body.emailaddress + "'"
//   sql.connect((err) => {
//     sql.query(asd, function (err, result) {
//       if (result == 0) {
//         bcrypt.hash(req.body.password, 10, function (err, hash) {
//           var db1 = "INSERT INTO user (`emailaddress`, `password`, `name`,`role`) VALUES ('" + req.body.emailaddress + "', '" + hash + "', '" + req.body.name + "','" + 2 + "')";
//           sql.query(db1, function (err, result1) {
//             console.log("pass");
//           });
//         });
//       }else{
//         res.status(400).json("not pass");
//       }
//     })
//   });

//   res.redirect('/');
// });


app.get('/', (req, res) => {
    res.send('Hello hello')
})
app.get('/movies/', (req, res) => {
    res.send('Hello get the number')
})
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
