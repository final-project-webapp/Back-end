const express = require('express')
const app = express()
const dotenv = require('dotenv');
const axios = require('axios');
const port = 3000
dotenv.config();
app.get('/movielist', (req, res) => {
    var db = "SELECT * FROM movie p, orderdetail od, orderdetail_has_product odh WHERE od.order_id = odh.orderDetail_order_id AND p.product_id = odh.product_product_id";
    sql.connect((err) => {
      sql.query(db, function (err, result1) {
        for (let index = 0; index < result1.length; index++) {
          var element = result1[index].product_name;
          console.log(element);
        }
        console.log(result1);
        res.send(result1);
      });
    });
})

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

app.get('/movies', async (req, res, next)=>{
  try {
      const {page} = req.query;
      const data = await fetchMovies(page);

      return res.status(200).json({
        status:200,
        message: `${data.length} movies found`, 
        data

      })
    } catch (err) {
      return next(err);
    }
})

app.post('/', (req, res) => {
    res.send('Hello World!')
})
app.put('/', (req, res) => {
    res.send('Hello World!')
})
app.delete('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})