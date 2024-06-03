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

module.exports = {
  getActors,
}
