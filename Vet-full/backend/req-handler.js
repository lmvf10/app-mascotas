const  StringDecoder  = require('string_decoder').StringDecoder;
const url = require('url');
const enrutador = require('./enrutador');

module.exports= (req,res) =>{
  //1. Obtener url desde el objeto request //ok
  const urlActual = req.url;
  const urlParseada = url.parse(urlActual,true);
  //2. Obtener la ruta
  const ruta = urlParseada.pathname;
  //3. Quitar slash
  const rutalimpia = ruta.replace(/^\/+|\/+$/g,'');
  
  //3.1 Obtener el metodo
  const metodo = req.method.toLowerCase();

  //3.1.1 Dar permisos de CORS
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Request-Methods","OPTIONS,GET,PUT,DELETE,POST");
  res.setHeader("Access-Control-Allow-Methods","OPTIONS,GET,PUT,DELETE,POST");
  res.setHeader("Access-Control-Allow-Headers","*");
  if(metodo === 'options'){
    res.writeHead(200);
    res.end();
    return;
  }

  //3.2 obtener variables del query url
  const {query = {}} = urlParseada;
  //3.3 obtener headers
  const {headers}=req;
  //3.4 obtener payload, en el caso de haber uno
  const decoder = new StringDecoder('utf8');
  let buffer = '';
  //3.4.1 ir acumulando la data cuando el request reciba un payload
  req.on('data',(data)=>{
    buffer += decoder.write(data);
  });
  //3.4.2 terminar de acumular datosy decirle al decoder que finalice
  req.on('end',()=>{
    buffer += decoder.end();

    if(headers["content-type"] === "application/json" && buffer){
      buffer = JSON.parse(buffer);
    }
    
    //3.4.3 revisar si tiene subrutinas en este caso es el indice del array
    if(rutalimpia.indexOf("/")>-1){
      var [rutaPrincipal, indice] = rutalimpia.split('/');
    }
    // 3.5 ordenar la data
    const data = {
      indice,
      ruta: rutaPrincipal || rutalimpia,
      query,
      metodo,
      headers,
      payload: buffer,
    };
    console.log({data});
    // 3.6 elegir el handler de la respuesta dependiendo de la ruta y asignarle la función que el enrutador tiene
    let handler;
    
    if(data.ruta && enrutador[data.ruta] && enrutador[data.ruta][metodo]){
      handler = enrutador[data.ruta][metodo];
    }
    else{
      handler = enrutador.noencontrado;
    }
    

    //3.6 ejecutar el handler para enviar respuesta
    if(typeof handler === 'function'){
      handler(data,(statusCode = 200, mensaje)=>{
        const respuesta = JSON.stringify(mensaje);
        res.setHeader("Content-Type","aplication/json");
        res.writeHead(statusCode);
        //línea donde realmente ya estamos respondiendo a la aplicación cliente
        res.end(respuesta);
      })
    }
    //4. Enviar una respuesta dependiendo de la ruta
    /*switch(rutalimpia){
    case 'ruta':
      res.end("Ruta conocida"); 
      break;
    default:
      res.end("Ruta desconocida"); 
    }*/  
  });
};