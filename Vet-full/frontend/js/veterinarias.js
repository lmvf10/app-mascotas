const identificación = document.getElementById('identificación');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const pais = document.getElementById('pais');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const savebtn = document.getElementById('savebtn');
const listaVeterinarios = document.getElementById('lista-Veterinarios');
const url = 'https://veterinaria-backend-kappa-beryl.vercel.app/veterinarios';
let veterinarios = [];

async function listarVeterinarios() {
  try{
    const respuesta = await fetch(url);
    const veterinariosDelServer = await respuesta.json();
    if(Array.isArray(veterinariosDelServer)){
      veterinarios = veterinariosDelServer
    }
    if(veterinarios.length>0){
      const htmlVeterinarios = veterinarios.map((veterinario, index)=>`<tr>
        <th scope="row">${index}</th>
        <td>${veterinario.identificación}</td>
        <td>${veterinario.nombre}</td>
        <td>${veterinario.apellido}</td>
        <td>${veterinario.pais}</td>
        <td>
          <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-indice=${index}><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
          </div>
        </td>
      </tr>`).join("");
      listaVeterinarios.innerHTML = htmlVeterinarios;
      Array.from(document.getElementsByClassName('editar')).forEach((btnEditar, index)=>btnEditar.onclick=editar(index));
      Array.from(document.getElementsByClassName('eliminar')).forEach((btnEliminar, index)=>btnEliminar.onclick=eliminar(index));
      return
    }
    listaMascotas.innerHTML = `<tr>
      <td colspan="5">No hay veterinarios</td>
    </tr>`;
  } catch(error){
    console.log({error});
    $(".alert").show();   
  }  
}

async function enviarDatos(evento){
  evento.preventDefault();
  try{
    const datos = {
      identificación: identificación.value,
      nombre: nombre.value,
      apellido: apellido.value,
      pais: pais.value,
  };
  const accion = savebtn.innerHTML;
  let urlEnvio = url;
  let method = "POST";
  if(accion === "Editar"){
      urlEnvio += `/${indice.value}`;
      veterinarios[indice.value] = datos;
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
      listarVeterinarios();
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
    const veterinario = veterinarios[index];
    nombre.value = veterinario.nombre;
    identificación.value = veterinario.identificación;
    apellido.value = veterinario.apellido;
    pais.value = veterinario.pais;
    indice.value = index;
  }
}

function resetModal(){
  nombre.value = '';
  apellido.value = '';
  identificación.value = '';
  pais.value='País';
  indice.value = '';
  savebtn.innerHTML = 'Save'
}

function eliminar(index){
  const urlEnvio = `${url}/${index}`;
  return async function clickeliminar(){
    try{
      const respuesta = await fetch(urlEnvio,{
        method: "DELETE",
        mode: "cors",
      });
      if(respuesta.ok){
        listarVeterinarios();
      }
    }catch(error){
     console.log({error});
    $(".alert").show();  
    }
  }
}

listarVeterinarios();

form.onsubmit = enviarDatos;
savebtn.onclick = enviarDatos;