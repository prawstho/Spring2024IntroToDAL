const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'keyin',
  host: 'localhost',
  database: 'dvdrental',
  password: 'keyin2024',
  port: 5434,
});

//get all actors.
var getActors = function() {
  if(DEBUG) console.log("actors.dal.getActors()");
  return new Promise(function(resolve, reject) {

    const sql = "SELECT actor_id, first_name, last_name FROM actor \
     ORDER BY last_name DESC LIMIT 7;"

    pool.query(sql, [], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log("success got data from inside the actors.dal.getActors().");
        if(DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    }); 
  }); 
};

// get one actor
var getActorById = function(theId) {
  if(DEBUG) console.log("actors.dal.getActorById()");
  if(DEBUG) console.log(`the actors id is: ${theId}`)
  return new Promise(function(resolve, reject) {

    const sql = "SELECT actor_id, first_name, last_name FROM actor \
      WHERE actor_id = $1;"

    pool.query(sql, [theId], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log("inside the actors.dal.getActorById() function");
        if(DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    }); 
  }); 
};

// get the films for all actors
var getActorFilms = function() {
  if(DEBUG) console.log("actors.dal.getActorFilms()");
  return new Promise(function(resolve, reject) {

    // const sql = "SELECT first_name, last_name, title, release_year, rating \
    //   FROM actor \
    //   INNER JOIN film_actor USING (actor_id) \
    //   INNER JOIN film USING (film_id) \
    //   ORDER BY last_name \
    //   LIMIT 100;"

    const sql = `SELECT * FROM public."vw_ActorFilms" LIMIT 60;`

    pool.query(sql, [], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log("success got data from inside the actors.dal.getActorFilms().");
        if(DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    }); 
  });   
}

// add a new actor
var addActor = function(fname, lname) {
  if(DEBUG) console.log("actors.pg.dal.addActor()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO public.actor(first_name, last_name) \
        VALUES ($1, $2);";
    pool.query(sql, [fname, lname], (err, result) => {
      if (err) {
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

module.exports = {
  getActors,
  getActorById,
  getActorFilms,
  addActor,
}
