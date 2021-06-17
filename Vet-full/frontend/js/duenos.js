const identificación = document.getElementById('identificación');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const savebtn = document.getElementById('savebtn');
const listaDuenos = document.getElementById('lista-duenos');
const url = 'https://veterinaria-backend-kappa-beryl.vercel.app/duenos';

let duenos = [];

async function listarduenos() {
  try{
    const respuesta = await fetch(url);
    const duenosDelServer = await respuesta.json();
    if(Array.isArray(duenosDelServer)){
      duenos = duenosDelServer
    }
    if(duenos.length>0){
      const htmlduenos = duenos.map((dueno, index)=>`<tr>
        <th scope="row">${index}</th>
        <td>${dueno.id}</td>
        <td>${dueno.nombre}</td>
        <td>${dueno.apellido}</td>
        <td>
          <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-indice=${index}><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
          </div>
        </td>
      </tr>`).join("");
    listaDuenos.innerHTML = htmlduenos;
    Array.from(document.getElementsByClassName('editar')).forEach((btnEditar, index)=>btnEditar.onclick=editar(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((btnEliminar, index)=>btnEliminar.onclick=eliminar(index));
    return;
    }
    listaDuenos.innerHTML = `<tr>
    <td colspan="5">No hay dueños</td>
    </tr>`;
  }catch(error){
    console.log({error});
    $(".alert").show();
  }
}

async function enviarDatos(evento){
  evento.preventDefault();
  try{
    const datos = {
      id: identificación.value,
      nombre: nombre.value,
      apellido: apellido.value,
    };
    const accion = savebtn.innerHTML;
    let urlEnvio = url;
    let method = "POST";
    if(accion === "Editar"){
      urlEnvio +=`/${indice.value}`;
      duenos[indice.value] = datos;
      method = "PUT";
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
      listarduenos();
      resetModal();
    }
  }catch(error){
      console.log({error});
      $(".alert").show();
  } 
}

function editar(index){  
  return function clickeo(){
    savebtn.innerHTML = 'Editar'
    //$('#staticBackdrop').modal('toggle');
    const dueno = duenos[index];
    nombre.value = dueno.nombre;
    identificación.value = dueno.id;
    apellido.value = dueno.apellido;
    indice.value = index;
  }
}

function resetModal(){
  nombre.value = '';
  apellido.value = '';
  identificación.value = '';
  indice.value = '';
  savebtn.innerHTML = 'Save'
}

function eliminar(index){
  const urlEnvio = `${url}/${index}`;
  return async function clickeliminar(){
    try{
      const respuesta = await fetch(urlEnvio,{
      method : "DELETE",
      mode: "cors",
      });
      if(respuesta.ok){
        listarduenos();
        resetModal();
      }
    }
    catch(error){
      console.log({error});
      $(".alert").show();
    }
  }
  
}

listarduenos();

form.onsubmit = enviarDatos;
savebtn.onclick = enviarDatos;