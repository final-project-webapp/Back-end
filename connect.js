// const { MongoClient } = require('mongodb');
// const { model } = require('mongoose');
// const url = "mongodb+srv://pormongo:saPIHnVv72cUs9BDgd8h@cluster0.ymi63.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(url);
// const MovieDB = require('node-themoviedb');
// const mdb = new MovieDB('c9410770f4b61e1b500f64637ab158e5', 'en-US');
const fs = require('fs');
const storage = require('node-persist');
var mysql = require('mysql2');
const dbConfig = require("./db.config.js");
const pool = require('generic-pool');

// const sql = pool.createPool({
//   create: (done) => {
//     return mysql.createConnection({
//       host:"mediare-db.mysql.database.azure.com", 
//       user:"weiR", 
//       password:"Pass12345", 
//       database:"mydb", 
//       port:3306, 
//       dateStrings:true,
//       multipleStatements: true,
//       ssl:{ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")}
//     }).connect(done);
//   },
//   destroy: sql => sql.destroy(),
//   validate: sql => sql.threadId,
// }, {
//   testOnBorrow: true,
//   acquireTimeoutMillis: 10000,
//   min: 1,
//   max: 20,
// });

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

// const pool = mysql.createPool({
//   host:"mediare-db.mysql.database.azure.com",
//   user:"weiR",
//   password:"Pass12345",
//   database:"mydb",
//   port:3306,
//   dateStrings:true,
//   multipleStatements: true,
//   ssl:{ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")},
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// })
// pool.getConnection(function(err, conn) {
//   // Do something with the connection
//   conn.query(/* ... */);
//   // Don't forget to release the connection when finished!
//   pool.releaseConnection(conn);
// })
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

// conn = await connPool.getConnection();
// if(!conn|| !conn.connection || conn.connection._closing){

// }

function intervalFunc() {
  sql.destroy(console.log('close'));
  sql.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
}
setInterval(intervalFunc, 1000 * 60 * 60 * 2);
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
