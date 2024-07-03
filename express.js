const express = require("express");
const app = express();
const PORT = 3000;

global.DEBUG = true;

app.get("/", (request, response) => {
    console.log("root route.")
    response.send("the route for the sites root /.")
})

const actorsRouter = require('./routes/actors')
app.use('/actors', actorsRouter);

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`)
});