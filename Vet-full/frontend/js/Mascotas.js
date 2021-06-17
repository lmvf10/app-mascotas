const tipo = document.getElementById('tipo');
const nombre = document.getElementById('nombre');
const dueño = document.getElementById('dueño');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const savebtn = document.getElementById('savebtn');
const listaMascotas = document.getElementById('lista-mascotas');
const url = "https://veterinaria-backend-kappa-beryl.vercel.app/mascotas";

let mascotas = [];

async function listarMascotas() {
  try{
    const respuesta = await fetch(url);
    const mascotasDelServer = await respuesta.json();
    if(Array.isArray(mascotasDelServer)){
      mascotas = mascotasDelServer
    }
    if(mascotas.length > 0){
      const htmlMascotas = mascotas.map((mascota, index)=>`<tr>
      <th scope="row">${index}</th>
      <td>${mascota.tipo}</td>
      <td>${mascota.nombre}</td>
      <td>${mascota.dueño}</td>
      <td>
          <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-indice=${index}><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
          </div>
        </td>
      </tr>`).join("");
      listaMascotas.innerHTML = htmlMascotas;
      Array.from(document.getElementsByClassName('editar')).forEach((btnEditar, index)=>btnEditar.onclick=editar(index));
      Array.from(document.getElementsByClassName('eliminar')).forEach((btnEliminar, index)=>btnEliminar.onclick=eliminar(index));
      return;
    }
    listaMascotas.innerHTML = `<tr>
      <td colspan="5">No hay mascotas</td>
    </tr>`;
  } catch(error){
    console.log({error});
    $(".alert").show();   
  }
}

async function enviarDatos(evento){
  evento.preventDefault();
  try {
    const datos = {
    tipo: tipo.value,
    nombre: nombre.value,
    dueño: dueño.value
    };
    let method = "POST";
    let urlEnvio = url;
    const accion = savebtn.innerHTML;
    if(accion === "Editar"){
      method = "PUT";
      mascotas[indice.value] = datos;
      urlEnvio = `${url}/${indice.value}`;
    }  
    const respuesta = await fetch(urlEnvio,{
      method,
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
      mode: "cors",
    });
    if(respuesta.ok){
      listarMascotas();
      resetModal();
    }
  } catch (error) {
    console.log({error});
    $(".alert-danger").show();
  }
  
}

function editar(index){  
  return function clickeo(){
    savebtn.innerHTML = 'Editar'
    //$('#staticBackdrop').modal('toggle');
    const mascota = mascotas[index];
    nombre.value = mascota.nombre;
    dueño.value = mascota.dueño;
    tipo.value = mascota.tipo;
    indice.value = index;
  }
}

function resetModal(){
  nombre.value = '';
  dueño.value = '';
  tipo.value = 'Tipo animal';
  indice.value = '';
  savebtn.innerHTML = 'Save'
}

function eliminar(index){
  const urlEnvio = `${url}/${index}`;
  return async function clickeliminar(){
    try {
      const respuesta = await fetch(urlEnvio,{
      method : "DELETE",
      });
      if(respuesta.ok){
        listarMascotas();
        resetModal();
      }    
    }
    catch(error){
      console.log({error});
      $(".alert").show();
    }
    
  }
  
}

listarMascotas();

function solicitarMascotas(){
  
}

form.onsubmit = enviarDatos;
savebtn.onclick = enviarDatos;