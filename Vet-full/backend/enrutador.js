const recursos = require('./recursos');
const mascotas = require("./rutas/mascotas");
const veterinarios = require("./rutas/veterinarios");
const duenos = require("./rutas/dueños");
const consultas = require("./rutas/consultas");

module.exports = {
    ruta: (data,callback)=>{
      callback(200,{mensaje:'Esta es /ruta'});
    },
    veterinarios: veterinarios(recursos.veterinarios),
    mascotas: mascotas(recursos.mascotas),
    duenos: duenos(recursos.duenos),
    consultas: consultas(recursos),
    noencontrado: (data,callback)=>{
      callback(404,{mensaje:'No encontrado'});
    },
  }