module.exports = {
  mascotas:[
    {tipo: "perro", nombre: "Bonnie", dueño: "Mama"},
    {tipo: "perro", nombre: "Bonnie1", dueño: "Mama"},
    {tipo: "perro", nombre: "Bonnie2", dueño: "Mama"},
    {tipo: "perro", nombre: "Bonnie3", dueño: "Mama"},
    {tipo: "perro", nombre: "Bonnie4", dueño: "Mama"},
  ],
  veterinarios : [
  {identificación: "0001", nombre: "Luis", apellido: "Vidal", pais: "México"},
  {identificación: "0002", nombre: "Roxana", apellido: "Soler", pais: "México"},
  {identificación: "0003", nombre: "El Cheto", apellido: "Vidal", pais: "Colombia"},
  ],
  duenos : [
  {nombre: "Lourdes", apellido: "Flores", id: "0001"},
  {nombre: "Luis", apellido: "Vidal", id: "0002"},
  {nombre: "Roxana", apellido: "Soler", id: "0003"},
  ],
  consultas : [
  {mascota:0, veterinario: 0, fechaCreacion: new Date(), fechaEdicion: new Date(), historia:"", diagnostico: ""},
  ],
};