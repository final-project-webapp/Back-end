const express = require("express");
const bodyParser = require("body-parser");
//const dotenv = require('dotenv');
const app = express();
const sql = require('./connect.js')
const connection = require('./connect.js')
const axios = require('axios');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
// const port = 3000
const req = require('express/lib/request');
app.use(express.json());
//require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const cors = require('cors');
//const { connect } = require("./connect.js");


const corsOptions = {
   // origin: 'https://frontend-final.azurewebsites.net',
   origin: 'http://localhost:8000',
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

app.get('/movies/:page', async (req, res, next) => {
  try {
    const { page } = req.query;
    const data = await fetchMovies(req.params.page);

    return res.status(200).json({ message: `List of movies found`, data })
  } catch (err) {
    return next(err);
  }
})

app.get('/moviesid/:moviesid', async (req, res, next) => {
  try {
    const { moviesid } = req.query;
    const data = await fetchMoviesId(req.params.moviesid);
    if (data != null) { return res.json(data) }
    else { return res.json({ status: 404, message: "Can't find the movie that you're looking for", data: "none" }) }
  } catch (err) {
    return next(err);
  }
})

app.get('/moviesprous/:movie_id', async (req, res, next) => {
  try {
    const { movie_id } = req.query;
    const data = await fetchMoviesProviders(req.params.movie_id);

    if (data.results.US != null) {
      if (data.results.US.flatrate != null) { return res.json(data) }
      else { return res.json({ status: 404, message: "Not Availavle", data: "none" }) }
    }
    else { return res.json({ status: 404, message: "Not Availavle", data: "none" }) }
  } catch (err) {
    return next(err)
  }
})

app.get('/moviesproth/:movie_id', async (req, res, next) => {
  try {
    const { movie_id } = req.query;
    const data = await fetchMoviesProviders(req.params.movie_id);
    if (data.results.TH != null) {
      if (data.results.TH.flatrate != null) { return res.json(data) }
      else { return res.json({ status: 404, message: "Not Availavle", data: "none" }) }
    }
    else { return res.json({ status: 404, message: "Not Availavle", data: "none" }) }
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

app.get('/moviesreviews/:movie_id', async (req, res, next) => {
  try {
    const { movie_id } = req.query;
    const data = await fetchMoviesReviews(req.params.movie_id);

    return res.status(200).json({
      message: `movies reviews found`,
      data

    })
  } catch (err) {
    return next(err);
  }
})
app.get('/moviessearch/:movie_name', async (req, res, next) => {
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

app.get('/moviessearchId/:movie_id', async (req, res, next) => {
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

// app.get('/getsingleuser', function (req, res) {
//   console.log('GSU:');  
//   if (!req.cookies['jwt']) {
//     return res.status(401).send("must login")
//   } else {
//     const theCookie = req.cookies['jwt'];
//     const decoded = jwt.verify(theCookie, 'secrect');
//     if (!decoded) {
//       return res.status(401).send("unauthebtucated")
//     }
//   sql.query('SELECT * FROM user WHERE user_id = ?', function (error, results) {
//     if (error) throw error;
//     res.json({ data: results[0]});
//     console.log('Result:');
//     console.log(results[0]);
//   });  
// }
// })

app.get('/getsingleuser', (req, res, next) => {
  if (!req.cookies['jwt']) {
    return res.status(401).send("must login")
  } else {
    const theCookie = req.cookies['jwt'];
    const decoded = jwt.verify(theCookie, 'secrect');
    if (!decoded) {
      return res.status(401).send("unauthebtucated")
    }
    sql.query('SELECT * FROM user where user_id=?', decoded.id, function (error, results) {
      if (error) throw error;
      res.send({ data: results[0]});
    });
  }
});


app.post('/adduser', function (req, res) {
  console.log('file received');
  var findemail = "Select emailaddress from user where emailaddress = '" + req.body.emailaddress + "'";
  sql.connect((err) => {
    sql.query(findemail, function (err, result1) {
      if (err) throw err;
      if (result1.length > 0) {
        res.status(401).json({data: 0});
      } else {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            var db1 = "INSERT INTO user (`name`, `emailaddress`,`DOB`, `password`, `role`) VALUES ('" + req.body.name + "', '" + req.body.emailaddress + "', '" + hash + "','" +req.body.DOB+ "','"+ '1' + "');";
            sql.connect((err) => {
              sql.query(db1, function (err, result1) {
                console.log("pass" + req.body.comment + req.body.comment_id);
                console.log(db1);
                if (err) throw err;
              });
            });
            res.status(200).json({data: 1});
          });
        });
      }
    });
  });
});

app.post('/login', function (req, res) {
  console.log('file received');
  var hash = "Select * from user where emailaddress = '" + req.body.emailaddress + "'";
  sql.connect((err) => {
    sql.query(hash, function (err, result1) {
      if (err) throw err;
      if (result1.length > 0) {
        bcrypt.compare(req.body.password, result1[0].password, function (err, result) {
          if (result == true) {
            var token = jwt.sign({ id: result1[0].user_id }, 'secrect', { expiresIn: '1d' });
            res.cookie('jwt', token, { maxAge: 24 * 60 * 60 * 1000 });
            res.status(200).json({data: 1});
          } else {
            res.status(401).json({data: 0});
          }
        });
      } else {
        res.status(401).json({data: 0});
      }
    })
  })
});

app.post('/addview', function (req, res) {
  console.log('file received');
  var select = "Select * from article where article_id = '" + req.body.article_id + "'";
  sql.connect((err) => {
    sql.query(select, function (err, result1) {
      var insert = "update article set view = '" + (result1[0].view + 1) + "' where article_id = '" + req.body.article_id + "'";
      sql.query(insert, function (err, result2) {
        if (err) throw err;
        console.log(result2);
        res.status(200).json({data: 1});
      });
    });
  });
})

app.post('/addcomment', function (req, res) {
  console.log('file received');
  var db1 = "INSERT INTO comment (`comment`, `user_user_id`) VALUES ('" + req.body.comment + "','" + req.body.user_user_id + "');";
  var cal = "SELECT * FROM comment WHERE comment_id = (SELECT MAX(comment_id) FROM comment);";
  sql.connect((err) => {
    sql.query(cal, function (err, result2) {
      console.log("pass2" + result2[0].comment_id);
      console.log(cal);
      calu = result2[0].comment_id + 1;
      sql.query(db1, function (err, result1) {
        console.log("pass" + req.body.comment);
        console.log(db1);
        var db2 = "INSERT INTO article_has_comment (`article_article_id`, `article_user_user_id`, `comment_comment_id`) VALUES ('" + req.body.article_article_id + "','" + req.body.article_user_user_id + "','" + calu + "');";
        sql.query(db2, function (err, result1) {
          console.log("pass" + req.body.comment);
          console.log(db2);
        });
      });
    });
  });
  //await new Promise(resolve => setTimeout(resolve, 1000));
  res.redirect('/');
  return res.status(200), res.send(data)
});


app.post('/logout', function (req, res) {
  if (!req.cookies['jwt']) {
    res.status(401).json({data: 0});
  }
  else{
    res.status(202).clearCookie('jwt').json({data: 1});
  }
})



app.get('/getalluser', function(req, res){
  var db1 = "SELECT * FROM user";
  sql.connect((err) => {
    sql.query(db1, function (err, result1) {
      console.log(db1);
      return res.status(200).json({
        message: `user found`,
        data: result1
      })
    });
  });
})



app.get('/getcommentinarticle/:article', function (req, res) {
  var a = "SELECT C.comment_id, C.comment, A.article_id, U.name, U.user_id FROM comment C, article_has_comment AHC, article A, user U WHERE C.comment_id = AHC.comment_comment_id AND AHC.article_article_id = A.article_id AND A.user_user_id = U.user_id AND A.article_id = " + req.params.article + ";";
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
    var asd = "SELECT * FROM comment;"
    sql.query(asd, function (err, result) {
      res.status(200).send(result);
    })
  });
});

app.post('/addarticle', function (req, res) {
  console.log('file received');
  console.log(req);
  var db1 = "INSERT INTO article (`articles`,`writer`, `date`,`movie_name`,`language`,`view`,`user_user_id`) VALUES ('" + req.body.articles + "', '" + req.body.writer + "', '" + req.body.date + "', '" + req.body.movie_name + "', '" + req.body.language + "', '" + req.body.view + "', '" + req.body.user_user_id + "')"
  sql.connect((err) => {
    sql.query(db1, function (err, result1) {
      console.log("pass" + req.body.articles + req.body.user_user_id);
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

app.get('/getsinglearticle/:article_id', function (req, res) {
  var db1 = "SELECT * FROM article WHERE article_id = " + req.params.article_id + ";"
  sql.connect((err) => {
    sql.query(db1, function (err, result1) {
      console.log(result1);
      res.send(result1);
    });
  });
})

app.get('/getsinglearticlename/:movie_name', function (req, res) {
  var db1 = "SELECT * FROM article WHERE movie_name LIKE " + "'" + req.params.movie_name + "'" + ";"
  sql.connect((err) => {
    sql.query(db1, function (err, result1) {
      console.log(result1);
      console.log(db1);
      res.send(result1);
    });
  });
})

app.get('getsingleuser/:user_id', function (req, res) {
  var db1 = "SELECT * FROM user WHERE user_id = " + req.params.user_id + ";"
  console.log(db1);
  // sql.connect((err) => {
  //   sql.query(db1, function (err, result1) {
  //     console.log(result1);
  //     res.send(result1);
  //   });
  // });
});

app.put('/editarticle/:article_id', function (req, res) {
  var db1 = "UPDATE article SET articles = '" + req.body.articles + "', writer = '" + req.body.writer + "', date = '" + req.body.date + "', movie_name = '" + req.body.movie_name + "', language = '" + req.body.language + "', view = '" + req.body.view + "' WHERE article_id = " + req.params.article_id + ";"
  sql.connect((err) => {
    sql.query(db1, function (err, result1) {
      console.log(result1);
      res.send(result1);
    });
  });
})

app.delete('/deletearticle/:article_id', function (req, res) {
  var db1 = "DELETE FROM article WHERE article_id = " + req.params.article_id + ";"
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
      console.log("pass" + req.body.comment + req.body.comment_id);
      console.log(db1);
    });
  });
  res.redirect('/');
  return res.status(200)
})

app.delete('/deletecomment/:comment_id', function (req, res) {
  console.log('file received');
  var db1 = "DELETE FROM comment WHERE comment_id = '" + req.params.comment_id + "';";
  var db2 = "DELETE FROM article_has_comment WHERE comment_comment_id = '" + req.params.comment_id + "';";
  sql.connect((err) => {
    sql.query(db2, function (err, result1) {
      console.log("pass" + req.params.comment_id);
      console.log(db2);
      sql.query(db1, function (err, result1) {
        console.log("pass" + req.params.comment_id);
        console.log(db1);
      });
    });
  });
  res.redirect('/');
  return res.status(200)

})

app.post('addliketocomment/:comment_id', function (req, res) {
  console.log('file received');
  var select = "Select * from comment where comment_id = '" + req.params.comment_id + "'";
  sql.connect((err) => {
    sql.query(select, function (err, result1) {
      var insert = "update comment set like = '" + (result1[0].like + 1) + "' where comment_id = '" + req.params.comment_id + "'";
      sql.query(insert, function (err, result2) {
        if (err) throw err;
        console.log(result2);
        res.status(200).json({data: 1});
      });
    });
  });
})

app.get('getcommentamout/:article_id', function (req, res) {
  console.log('file received');
  var select = "Select * from article_has_comment where article_article_id = '" + req.params.article_id + "'";
  sql.connect((err) => {
    sql.query(select, function (err, result1) {
      if (err) throw err;
      console.log(result1);
      res.status(200).json({data: result1.length});
    });
  });
});

app.post('makereviewer/:user_id', function (req, res) {
  console.log('file received');
  var select = "Select * from user where user_id = '" + req.params.user_id + "'";
  sql.connect((err) => {
    sql.query(select, function (err, result1) {
      var insert = "update user set reviewer = '" + 1 + "' where user_id = '" + req.params.user_id + "'";
      sql.query(insert, function (err, result2) {
        if (err) throw err;
        console.log(result2);
        res.status(200).json({data: 1});
      });
    });
  });
})

app.get('gettotallikeperuser/:user_id', function (req, res) {
  console.log('file received');
  var select = "Select * from user where user_id = '" + req.params.user_id + "'";
  sql.connect((err) => {
    sql.query(select, function (err, result1) {
      if (err) throw err;
      console.log(result1);
      res.status(200).json({
        name: result1[0].name,
        totallike: result1[0].like});
    });
  });
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

