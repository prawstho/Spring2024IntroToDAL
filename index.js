const http = require('http');

const myEventEmitter = require('./logEvents');
const { getActors, getActorFilms } = require('./services/actors.dal')

const port = 3000;

global.DEBUG = true;

const server = http.createServer( async (request, response) => {
  // ignore the favicon.ico for some browsers
  if (request.url === '/favicon.ico') {
    // Ignore favicon.ico requests
    response.writeHead(204, {'Content-Type': 'image/x-icon'});
    response.end();
    return;
  }
  const fullUrl = `http://${request.headers.host}${request.url}`;
  if(DEBUG) console.log('Request Url:', fullUrl);
  switch(request.url) {
    case '/':
      myEventEmitter.emit('event', fullUrl, 'INFO', 'Root of Server successfully rendered.');
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('Welcome to the DAL.');
      break;
    case '/actors/':
      try {
        let theActors = await getActors(); // fetch actors from postgresql
        myEventEmitter.emit('event', fullUrl, 'INFO', 'Actors fetched from database.');
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(theActors));
      } catch (error) {
        console.error(error);
        let message = `500 - server error with internal error code of ${error.code}.`
        myEventEmitter.emit('event', fullUrl, 'ERROR', message);
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({ error: 'An error occurred while fetching actors' }));
      } finally {
        response.end();
      }
      break;
    case '/films/':
      try {
        let theActorFilms = await getActorFilms(); // fetch actors from postgresql
        myEventEmitter.emit('event', fullUrl, 'INFO', 'Actor Films fetched from database.');
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(theActorFilms));
      } catch (error) {
        console.error(error);
      } finally {
        response.end();
      }
      break;
    default:
      let message = `404 - Content Not Found.`;
      if(DEBUG) console.log(message);
      myEventEmitter.emit('event', fullUrl, 'ERROR', message);
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404 - Content Not Found.');
      break;
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}...`)
});