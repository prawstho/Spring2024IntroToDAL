const express = require("express");
const app = express();

global.DEBUG = true;

app.get("/", (request, response) => {
    console.log("root route.")
    response.send("the route for the sites root /.")
})
// app.get("/:duck", (request, response) => {
//   console.log("root route with parameter.")
//   console.log(`the parameter is: ${request.params.duck}`);
//   response.send("the route for the sites root /.")
// })

const { getActorById } = require('./services/actors.dal')

app.get("/:id", async (request, response) => {
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

app.listen(3000)