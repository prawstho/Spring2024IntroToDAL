const express = require('express');
const router = express.Router();

const { getActors, getActorById, addActor } = require('../services/actors.dal')

// https://localhost:3000/actors/
router.get('/', async (request, response) => {
  try {
      let theActors = await getActors(); 
      if(DEBUG) console.table(theActors);
      response.write(JSON.stringify(theActors));
      response.end()
  } catch {
      if(DEBUG) console.log("Error fetching actors.")
      response.status(500).send('500 - Server error with data fetching.');
  }
});

// https://localhost:3000/actors/999
router.get("/:id", async (request, response) => {
  if(DEBUG) console.log(`/actors/:id route was accessed using id: ${request.params.id}.`)
  try {
    let anActor = await getActorById(request.params.id); // fetch actor from postgresql
    response.write(JSON.stringify(anActor));
    response.end()
  } catch {
    if(DEBUG) console.log("Error fetching actor data.")
    response.status(500).send('500 - Server error with data fetching.');
  }
})
// router.post
router.post('/', async (request, response) => {
  if(DEBUG) { 
      console.log('ROUTE: /actors/ POST');
      console.log(request.body);
  }
  try {
      await addActor(request.body.firstName, request.body.lastName );
      response.statusCode = 201;
      response.json({message: "Created", status: 201});
  } catch {
      // log this error to an error log file.
      response.statusCode = 503;
      response.json({message: "Service Unavailable", status: 503});
  } 
});
// router.put
// router.patch
// router.delete

module.exports = router;