const { MongoClient } = require('mongodb');
const { model } = require('mongoose');
const url = "mongodb+srv://pormongo:saPIHnVv72cUs9BDgd8h@cluster0.ymi63.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);
const MovieDB = require('node-themoviedb');
const mdb = new MovieDB('c9410770f4b61e1b500f64637ab158e5', 'en-US');
async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
(async () => {
    try {
      const args = {
        pathParameters: {
         now_playing
        },
      };
      const movie = await mdb.movie.getDetails(args);
      console.log(movie);
      /*
        {
          data: Object. Parsed json data of response
          headers: Object. Headers of response
        }
      */
    } catch (error) {
      console.error(error);
    }
  })();

module.exports.run = run;

run().catch(console.dir);