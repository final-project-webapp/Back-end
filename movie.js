const express = require("express");
const bodyParser = require("body-parser");
//const dotenv = require('dotenv');
const app = express();
const sql = require('./connect.js')
const axios = require('axios');
//const bcrypt = require('bcrypt');
// const port = 3000
// import sql from 'connect.js';
//const req = require('express/lib/request');
app.use(express.json());
//require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
const cors = require('cors');


const corsOptions = {
  origin: 'https://frontend-final.azurewebsites.net',
  //origin: 'http://localhost:8000',
  credentials: true,
};
app.use(cors(corsOptions));


  // window.fbAsyncInit = function() {
  //   FB.init({
  //     appId      : '{your-app-id}',
  //     cookie     : true,
  //     xfbml      : true,
  //     version    : '{api-version}'
  //   });
      
  //   FB.AppEvents.logPageView();   
      
  // };

  // (function(d, s, id){
  //    var js, fjs = d.getElementsByTagName(s)[0];
  //    if (d.getElementById(id)) {return;}
  //    js = d.createElement(s); js.id = id;
  //    js.src = "https://connect.facebook.net/en_US/sdk.js";
  //    fjs.parentNode.insertBefore(js, fjs);
  //  }(document, 'script', 'facebook-jssdk'));

  //  FB.getLoginStatus(function(response) {
  //   statusChangeCallback(response);
  //   });
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

const fetchMoviesSearchId = async (movie_id) => {
  try {
    let result;
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=c9410770f4b61e1b500f64637ab158e5&language=en-US`
        
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

app.get('/moviessearchId/:movie_id', async (req, res, next)=>{
  try {
      const data = await fetchMoviesSearchId(req.params.movie_id);      
      return res.status(200).json({
        message: `movies found`, 
        data,        
      })
      console.log(data)
    } catch (err) {    
      return next(err);
    }
})

app.post('/adduser', function (req, res) {
  console.log('file received');
  console.log(req);
  var db1 = "INSERT INTO user (`name`, `emailaddress`, `password`, `phonenumber`, `DOB`, `address`, `role`) VALUES ('"+ req.body.name +"', '"+ req.body.emailaddress+"', '"+ req.body.password + "', '"+ req.body.phonenumber +"', '" + req.body.DOB + "', '"+req.body.address+"', '1');"
  sql.connect((err) => {
          sql.query(db1, function (err, result1) {
            console.log("pass"+ req.body.comment+ req.body.comment_id);
            console.log(db1);
          });
        });
   res.redirect('/');
   return res.status(200)
});

// app.post('/addcomment', function (req, res) {
//   console.log('file received');
//   console.log(req);
//   var db1 = "INSERT INTO comment (`comment`, `user_user_id`) VALUES ('" + req.body.comment  + "','" +  req.body.user_user_id +"')"
//   sql.connect((err) => {
//           sql.query(db1, function (err, result1) {
//             console.log("pass"+ req.body.comment+ req.body.comment_id);
//             console.log(db1);
//           });
//         });
//    res.redirect('/');
//    return res.status(200)
// });

app.post('/addcomment',function (req, res) {
  console.log('file received');
  var db1 = "INSERT INTO comment (`comment`, `user_user_id`) VALUES ('" + req.body.comment  + "','" +  req.body.user_user_id +"');";
  var cal = "SELECT * FROM comment WHERE comment_id = (SELECT MAX(comment_id) FROM comment);";
  sql.connect((err) => {
          sql.query(cal, function (err, result2) {
            console.log("pass2"+ result2[0].comment_id);
            console.log(cal);
            calu = result2[0].comment_id + 1 ;
            sql.query(db1, function (err, result1) {
              console.log("pass"+ req.body.comment);
              console.log(db1);
              var db2 = "INSERT INTO article_has_comment (`article_article_id`, `article_user_user_id`, `comment_comment_id`) VALUES ('" + req.body.article_article_id  + "','" +  req.body.article_user_user_id +"','"+ calu +"');";
              sql.query(db2, function (err, result1) {
                console.log("pass"+ req.body.comment);
                console.log(db2);
              });
            });
          });
        });
        //await new Promise(resolve => setTimeout(resolve, 1000));
        res.redirect('/');
           return res.status(200), res.send(data)
});

app.get('/getcommentinarticle/:article', function (req, res) {
  var a = "SELECT C.comment_id, C.comment, A.article_id, U.name FROM comment C, article_has_comment AHC, article A, user U WHERE C.comment_id = AHC.comment_comment_id AND AHC.article_article_id = A.article_id AND A.user_user_id = U.user_id AND A.article_id = "+ req.params.article+";";
  sql.connect((err) => {
    sql.query(a, function (err, result) {
      res.status(200).send(result);
    })
  });
});

app.get('/registeruser1', function (req, res) {
  console.log('file received');
  console.log(req);
  sql.connect((err) => {
    var asd = "SELECT * FROM user;"
    sql.query(asd, function (err, result) {
      res.status(200).send(result);
    })
  });
});

app.get('/comment', function (req, res) {
  console.log('file received');
  console.log(req);
  sql.connect((err) => {
    var asd = "SELECT * FROM commenttest;"
    sql.query(asd, function (err, result) {
      res.status(200).send(result);
    })
  });
});

app.post('/addarticle', function (req, res) {
  console.log('file received');
  console.log(req);
  var db1 = "INSERT INTO article (`articles`,`writer`, `date`,`movie_name`,`language`,`view`,`user_user_id`) VALUES ('"+ req.body.articles  +"', '"+ req.body.writer +"', '"+ req.body.date +"', '"+ req.body.movie_name +"', '"+ req.body.language +"', '"+ req.body.view+"', '"+req.body.user_user_id+"')"
  sql.connect((err) => {
          sql.query(db1, function (err, result1) {
            console.log("pass"+ req.body.articles+ req.body.user_user_id);
            console.log(db1);
          });
        });
   res.redirect('/');
   return res.status(200)
});

app.get('/getarticle', function (req, res) {
  console.log('file received');
  console.log(req);
  var db1 = "SELECT * FROM article;"
  sql.connect((err) => {
    sql.query(db1, function (err, result1) {
      console.log(result1);
      res.send(result1);
    });
  });
});

app.get('/getsinglearticle/:article_id',function (req, res){
  var db1 = "SELECT * FROM article WHERE article_id = "+ req.params.article_id +";"
  sql.connect((err) => {
    sql.query(db1, function (err, result1) {
      console.log(result1);
      res.send(result1);
    });
  });
})

app.get('/getsinglearticlename/:movie_name',function (req, res){
  var db1 = "SELECT * FROM article WHERE movie_name LIKE "+ "'" + req.params.movie_name + "'" +";"
  sql.connect((err) => {
    sql.query(db1, function (err, result1) {
      console.log(result1);
      console.log(db1);
      res.send(result1);
    });
  });
})

app.put('/editarticle/:article_id',function (req, res){
  var db1 = "UPDATE article SET articles = '"+ req.body.articles +"', writer = '"+ req.body.writer +"', date = '"+ req.body.date +"', movie_name = '"+ req.body.movie_name +"', language = '"+ req.body.language +"', view = '"+ req.body.view +"' WHERE article_id = "+ req.params.article_id +";"
  sql.connect((err) => {
    sql.query(db1, function (err, result1) {
      console.log(result1);
      res.send(result1);
    });
  });
})

app.delete('/deletearticle/:article_id',function (req, res){
  var db1 = "DELETE FROM article WHERE article_id = "+ req.params.article_id +";"
  sql.connect((err) => {
    sql.query(db1, function (err, result1) {
      console.log(result1);
      res.send(result1);
    });
  });
  
})

app.put('/editcomment', function (req, res) {
  console.log('file received');
  console.log(req);
  var db1 = "UPDATE comment SET comment = '" + req.body.comment + "' WHERE comment_id = '" + req.body.comment_id + "';";
  sql.connect((err) => {
          sql.query(db1, function (err, result1) {
            console.log("pass"+ req.body.comment+ req.body.comment_id);
            console.log(db1);
          });
        });
   res.redirect('/');
   return res.status(200)
})

app.delete('/deletecomment/:comment_id', function (req, res) {
  console.log('file received');
  console.log(req);
  var db1 = "DELETE FROM comment WHERE comment_id = '" + req.params.comment_id + "';";
  var db2 = "DELETE FROM article_has_comment WHERE comment_comment_id = '" + req.params.comment_id + "';";
  sql.connect((err) => {
          sql.query(db2, function (err, result1) {
            console.log("pass" + req.params.comment_id);
            console.log(db2);
            sql.query(db1, function (err, result1) {
              console.log("pass"+ req.params.comment_id);
              console.log(db1);
            });
          });
        });   
  res.redirect('/');
   return res.status(200)
   
})


app.get('/', (req, res) => {
    res.send('Hello hello')
})
app.get('/movies/', (req, res) => {
    res.send('Hello get the number')
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
