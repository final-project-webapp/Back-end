// const { MongoClient } = require('mongodb');
// const { model } = require('mongoose');
// const url = "mongodb+srv://pormongo:saPIHnVv72cUs9BDgd8h@cluster0.ymi63.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(url);
// const MovieDB = require('node-themoviedb');
// const mdb = new MovieDB('c9410770f4b61e1b500f64637ab158e5', 'en-US');
const fs = require('fs');
//const { model } = require('mongoose');
var mysql = require('mysql2');
const dbConfig = require("./db.config.js");


var sql =mysql.createConnection({
  host:"mediare-db.mysql.database.azure.com", 
  user:"weiR", 
  password:"Pass12345", 
  database:"mydb", 
  port:3306, 
  dateStrings:true,
  multipleStatements: true,
  ssl:{ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")}
});
// var connection = ({
//   origin:"https://frontend-final.azurewebsites.net",
//   credentials: true,
//   //origin:"http://localhost:8000",
// });

// var sql = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Por.123456',
//   database: 'mydb',
//   dateStrings:true,
//   port:3306,
//   multipleStatements: true
// });
sql.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");});
// module.exports = connection;
module.exports = sql;
// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");
//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// }
// (async () => {
//     try {
//       const args = {
//         pathParameters: {
//          now_playing
//         },
//       };
//       const movie = await mdb.movie.getDetails(args);
//       console.log(movie);
//       /*
//         {
//           data: Object. Parsed json data of response
//           headers: Object. Headers of response
//         }
//       */
//     } catch (error) {
//       console.error(error);
//     }
//   })();

// module.exports.run = run;

// run().catch(console.dir);