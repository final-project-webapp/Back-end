const express = require("express");
const bodyParser = require("body-parser");
//const dotenv = require('dotenv');
const app = express();
const sql = require('./connect.js')
const connection = require('./connect.js')
const axios = require('axios');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs = require("fs");
const https = require('https');
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
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://mediare.azurewebsites.net");
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, withCredentials, Cookie, Set-Cookie");
  next();
});
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
const corsOptions = {
  //origin:"https://mediare.azurewebsites.net",
  origin:"https://20.239.69.7",
  credentials: true,
  //origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

//const options = {
//  key: fs.readFileSync('etc/key.pem'),
//  cert: fs.readFileSync('etc/cert.pem')
//};
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
//   if (!req.cookies['jwt']) {
//     return res.status(401).send("must login")
//   } else {
//     const theCookie = req.cookies['jwt'];
//     const decoded = jwt.verify(theCookie, 'secrect');
//     if (!decoded) {
//       return res.status(401).send("unauthebtucated")
//     }
//   sql.query('SELECT * FROM article WHERE user_user_id ='+ decoded.id, function (error, results) {
//     if (error) throw error;
//     return res.send(results);
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
      res.send({ data: results[0] });
    });
  }
});

app.put('/editarticle1', function (req, res) {
  if (!req.cookies['jwt']) {
    return res.status(401).send("must login")
  } else {
    const theCookie = req.cookies['jwt'];
    const decoded = jwt.verify(theCookie, 'secrect');
    if (!decoded) {
      return res.status(401).send("unauthebtucated")
    }
    if (decoded.role != 2) {
      sql.query('UPDATE article SET articles = ? WHERE article_id = ? and user_user_id = ?', [req.body.articles, req.body.article_id, decoded.id], function (error, results) {
        if (error) throw error;
        if (results.affectedRows == 0) {
          console.log(decoded);
          return res.status(401).send("not real user")
        }
        return res.send(results);
      });
    } else {
      sql.query('UPDATE article SET articles=? WHERE article_id=?', [req.body.articles, req.body.article_id], function (error, results) {
        if (error) throw error;
        console.log(decoded);
        return res.send(results);

      });
    }
  }
})

app.post('/adduser', function (req, res) {
  console.log('file received');
  var findemail = "Select emailaddress from user where emailaddress = '" + req.body.emailaddress + "'";
  var findname = "Select name from user where name = '" + req.body.name + "'";
  var findalias = "Select alias from user where alias = '" + req.body.alias + "'";
  sql.connect((err) => {
    sql.query(findname, function (err, result2) {
      if (err) throw err;
      if (result2.length > 0) {
         res.status(401).json({ data: 0 });
      }
    });
  });
    sql.connect((err) => {
    sql.query(findalias, function (err, result3) {
      if (err) throw err;
      if (result3.length > 0) {
         res.status(401).json({ data: 0 });
      }
    })
   })
   sql.connect((err) => {
    sql.query(findemail, function (err, result1) {
      if (err) throw err;
      if (result1.length > 0) {
        res.status(401).json({ data: 0 });
      } else {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            var db1 = "INSERT INTO user (`name`,`alias` ,`emailaddress`,`password`, `DOB`, `role`) VALUES ('" + req.body.name + "', '"+ req.body.alias+ "', '"+ req.body.emailaddress + "', '" + hash + "','" + req.body.DOB + "','" + '1' + "');";
            sql.connect((err) => {
              sql.query(db1, function (err, result1) {
                console.log("pass" + req.body.comment + req.body.comment_id);
                console.log(db1);
                if (err) throw err;
              });
            });
            return res.status(200).json({ data: 1 });
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
            var token = jwt.sign({ id: result1[0].user_id, role: result1[0].role }, 'secrect', { expiresIn: '1d' });
            res.cookie('jwt', token,
              {
                maxAge: 24 * 60 * 60 * 1000,
                secure: true,
                sameSite: 'none'
              });
            res.status(200).json({ data: 1 });
          } else {
            res.status(401).json({ data: 0 });
          }
        });
      } else {
        res.status(401).json({ data: 0 });
      }
    })
  })
});

app.get('/getcookie', function (req, res) {
  res.cookie('jwt', 'test', {
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: 'none'
  });
  res.redirect('/');
});

app.post('/addview/:article_id', function (req, res) {
  console.log('file received');
  var select = "Select * from article where article_id = '" + req.params.article_id + "'";
  sql.connect((err) => {
    sql.query(select, function (err, result1) {
      var insert = "update article set view = '" + (result1[0].view + 1) + "' where article_id = '" + req.params.article_id + "'";
      sql.query(insert, function (err, result2) {
        if (err) throw err;
        console.log(result2);
        res.status(200).json({ data: 1 });
      });
    });
  });
})

app.post('/addcomment', function (req, res) {
  console.log('file received');
  var db1 = "INSERT INTO comment (`comment`, `user_user_id`, `comment_writer`) VALUES ('" + req.body.comment + "','" + req.body.user_user_id + "','" + req.body.comment_writer + "');";
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
  return res.status(200)
});


app.post('/logout', function (req, res) {
  // if (!req.cookies['jwt']) {
  res.clearCookie('jwt', {
    secure: true,
    sameSite: 'none'
  }).json({ data: 1 });
  //res.status(401).json({data: 0});
  //}
  //else{
  //  res.status(202).clearCookie('jwt').json({data: 1});
  //}
})



app.get('/getalluser', function (req, res) {
  if (!req.cookies['jwt']) {
    return res.status(401).send("must login")
  } else {
    const theCookie = req.cookies['jwt'];
    const decoded = jwt.verify(theCookie, 'secrect');
    if (!decoded) {
      return res.status(401).send("unauthebtucated")
    }
    if (decoded.role != 2) {
      return res.status(401).send("unauthebtucated")
    }
    var db1 = "SELECT * FROM user";
    sql.connect((err) => {
      sql.query(db1, function (err, result1) {
        console.log(db1);
        console.log(result1);
        return res.status(200).json({
          message: `user found`,
          data: result1
        })
      });
    });
  }
})



app.get('/getcommentinarticle/:article', function (req, res) {
  var a = "SELECT C.comment_id, C.comment, C.comment_writer, C.user_user_id, A.article_id, U.name, U.role, U.user_id FROM comment C, article_has_comment AHC, article A, user U WHERE C.comment_id = AHC.comment_comment_id AND AHC.article_article_id = A.article_id AND A.user_user_id = U.user_id AND A.article_id = " + req.params.article + ";";
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
  if (!req.cookies['jwt']) {
    return res.status(401).send("must login")
  } else {
    const theCookie = req.cookies['jwt'];
    const decoded = jwt.verify(theCookie, 'secrect');
    if (!decoded) {
      return res.status(401).send("unauthebtucated")
    }
    var db1 = "INSERT INTO article (`articles`,`writer`, `date`,`movie_name`,`language`,`view`,`user_user_id`) VALUES ('" + req.body.articles + "', '" + req.body.writer + "', '" + req.body.date + "', '" + req.body.movie_name + "', '" + req.body.language + "', '" + req.body.view + "', '" + decoded.id + "')"
    sql.connect((err) => {
      sql.query(db1, function (err, result1) {
        console.log("pass" + req.body.articles + decoded.id);
        console.log(db1);
      });
    });
    res.redirect('/');
    return res.status(200)
  }
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

app.get('/getsingleuser/:user_id', function (req, res) {
  var db1 = "SELECT * FROM user WHERE user_id = " + req.params.user_id + ";"
  console.log(db1);
  sql.connect((err) => {
    sql.query(db1, function (err, result1) {
      console.log(result1);
      res.send(result1);
    });
  });
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
  var db2 = "DELETE FROM article_has_comment WHERE article_article_id = " + req.params.article_id + ";"
  sql.connect((err) => {
    sql.query(db2, function (err, result1) {
      console.log(result1);
      sql.query(db1, function (err, result2) {
        console.log(result2);
        res.send(result2);
      });
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

app.post('/addliketocomment/:comment_id', function (req, res) {
  console.log('file received');
  var select = "Select * from comment where comment_id = '" + req.params.comment_id + "'";
  sql.connect((err) => {
    sql.query(select, function (err, result1) {
      var insert = "update comment set like = '" + (result1[0].like + 1) + "' where comment_id = '" + req.params.comment_id + "'";
      sql.query(insert, function (err, result2) {
        if (err) throw err;
        console.log(result2);
        res.status(200).json({ data: 1 });
      });
    });
  });
})

app.get('/getcommentamout/:article_id', function (req, res) {
  console.log('file received');
  var select = "Select * from article_has_comment where article_article_id = '" + req.params.article_id + "'";
  sql.connect((err) => {
    sql.query(select, function (err, result1) {
      if (err) throw err;
      console.log(result1);
      res.status(200).json({ data: result1.length });
    });
  });
});

app.post('/makereviewer/:user_id', function (req, res) {
  console.log('file received');
  var select = "Select * from user where user_id = '" + req.params.user_id + "'";
  sql.connect((err) => {
    sql.query(select, function (err, result1) {
      var insert = "update user set reviewer = '" + 1 + "' where user_id = '" + req.params.user_id + "'";
      sql.query(insert, function (err, result2) {
        if (err) throw err;
        console.log(result2);
        res.status(200).json({ data: 1 });
      });
    });
  });
})

app.get('/gettotallikeperuser/:user_id', function (req, res) {
  console.log('file received');
  var select = "Select * from user where user_id = '" + req.params.user_id + "'";
  sql.connect((err) => {
    sql.query(select, function (err, result1) {
      if (err) throw err;
      console.log(result1);
      res.status(200).json({
        name: result1[0].name,
        totallike: result1[0].like
      });
    });
  });
})

app.get('/getarticleowner', function (req, res) {
  if (!req.cookies['jwt']) {
    return res.status(401).send("must login")
  } else {
    const theCookie = req.cookies['jwt'];
    const decoded = jwt.verify(theCookie, 'secrect');
    if (!decoded) {
      return res.status(401).send("unauthebtucated")
    }
    sql.query("SELECT * FROM article WHERE user_user_id = '" + decoded.id + "'", function (err, result) {
      if (err) throw err;
      console.log(decoded.id);
      return res.status(200).send(result);
    });
  }
})

app.put('/editalias', function (req, res) {
  console.log('file received');
  console.log(req);
  if (!req.cookies['jwt']) {
    return res.status(401).send("must login")
  } else {
    const theCookie = req.cookies['jwt'];
    const decoded = jwt.verify(theCookie, 'secrect');
    if (!decoded) {
      return res.status(401).send("unauthenticated")
    }
    var db1 = "UPDATE user SET alias = '" + req.body.alias + "' WHERE user_id = '" + decoded.id + "';";
    var findalias = "Select alias from user where alias = '" + req.body.alias + "'";
    sql.connect((err) => {
      sql.query(findalias, function (err, result1) {
        if (err) throw err;
        console.log("pass" + req.body.alias + decoded.id);
        if (result1.length > 0) {
          res.status(401).json({ data: 0 });
        } else {
          sql.query(db1, function (err, result2) {
            if (err) throw err;
            console.log("pass" + req.body.alias + decoded.id);
            console.log(db1);
          });
          res.status(200).json({ data: 1 });
        }
      });
    })
  }
});

app.put('/editpassword', function (req, res) {
  console.log('password received');
  if (!req.cookies['jwt']) {
    return res.status(401).send("must login")
  } else {
    const theCookie = req.cookies['jwt'];
    const decoded = jwt.verify(theCookie, 'secrect');
    if (!decoded) {
      return res.status(401).send("unauthenticated")
    }
    var checkpassword = "SELECT * FROM user WHERE user_id = '" + decoded.id + ";";
    sql.connect((err) => {
      sql.query(checkpassword, function (err, result1) {
        if (err) throw err;
        console.log(result1);
        if (result1.length == 1) {
          bcrypt.compare(req.body.password, result1[0].password, function (err, result) {
            if (result == true) {
              bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(req.body.new_password, salt, function (err, hash) {
                  var db1 = "UPDATE user SET password = '" + hash + "' WHERE user_id = '" + decoded.id + "';";
                  sql.query(db1, function (err, result2) {
                    console.log("able to change password")
                    console.log(result2);
                    console.log("pass" + req.body.password + decoded.id + req.body.new_password);
                    res.status(200).json({ data: 1 });
                  });
                });
              });
            } else {
              return res.status(401).send("wrong password")
            }
          });
        } else {
          return res.status(401).send("Need to login")
        }
      });
    })
  }
})

app.delete('/deleteuser/:user_id', function (req, res) {
  console.log('file received');
  var db1 = "DELETE FROM user WHERE user_id = '" + req.params.user_id + "';";
  sql.connect((err) => {
    sql.query(db1, function (err, result1) {
      console.log("pass" + req.params.user_id);
      console.log(db1);
    });
  });
  res.redirect('/');
  return res.status(200)
})

app.get('/getarticlebyidparam/:user_id', function (req, res) {
  console.log('file received');
  var select = "Select * from article where user_user_id = '" + req.params.user_id + "'";
  sql.connect((err) => {
    sql.query(select, function (err, result1) {
      if (err) throw err;
      console.log(result1);
      res.status(200).json({ data: result1 });
    });
  });
})

app.get('/searcharticle/:article_name', function (req, res) {
  console.log('file received');
  var select = "Select * from article where movie_name LIKE '" + req.params.article_name + "%'";
  sql.connect((err) => {
    sql.query(select, function (err, result1) {
      if (err) throw err;
      console.log(result1);
      res.status(200).json({ data: result1 });
    });
  });
})

app.get('/', (req, res) => {
  console.log("it's working");
  res.send('Hello hello')
})
app.get('/movies/', (req, res) => {
  res.send('Hello get the number')
})
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//https.createServer(options, app).listen(PORT);