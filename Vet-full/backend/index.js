const http = require('http');
const requestHandler = require('./req-handler');


const server = http.createServer(requestHandler);
server.listen(80, ()=>{
  console.log('el servidor esta escuchando peticiones en el puerto 8000')
});