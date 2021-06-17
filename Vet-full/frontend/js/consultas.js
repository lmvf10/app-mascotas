const listaConsultas = document.getElementById("lista-consultas");
const url = "https://veterinaria-backend-kappa-beryl.vercel.app";
const mascota = document.getElementById("mascota");
const btnGuardar = document.getElementById("btn-guardar");
const indice = document.getElementById("indice");
const historia = document.getElementById("historia");
const diagnostico = document.getElementById("diagnostico");
var myAlert = document.getElementById('myAlert')

var Mymodal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
  keyboard: false
})

let consultas = [];
let mascotas = [];
let veterinarios = [];


async function listarConsultas(){
  const entidad = 'consultas';
  try{
    const respuesta = await fetch(`${url}/${entidad}`);
    const consultasDelServer = await respuesta.json();
    if(Array.isArray(consultasDelServer)){
      consultas = consultasDelServer;
    }
    if(respuesta.ok){
      const htmlConsultas = consultas.map((consulta, indice)=>
        `<tr>
        <th scope="row">${indice}</th>
        <td>${consulta.mascota.nombre}</td>
        <td>${consulta.veterinario.nombre} ${consulta.veterinario.apellido}</td>
        <td>${consulta.diagnostico}</td>
        <td>${consulta.fechaCreacion}</td>
        <td>${consulta.fechaEdicion}</td>        
        <td>
          <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-indice=${indice}><i class="fas fa-edit"></i></button>
          </div>
        </td>
      </tr>`
      ).join("");
      listaConsultas.innerHTML = htmlConsultas;
      Array.from(document.getElementsByClassName("editar")).forEach((botonEditar,index) => (botonEditar.onclick = editar(index)));
    }

  }catch(error){
    console.log({error});
      $(".alert-danger").show();
  }
}

async function listarMascotas() {
  const entidad = "mascotas";
  try{
    const respuesta = await fetch(`${url}/${entidad}`);
    const mascotasDelServer = await respuesta.json();
    if(Array.isArray(mascotasDelServer)){
      mascotas = mascotasDelServer
    }
    if(respuesta.ok){
      mascotas.forEach((_mascota, index)=>{
        const optionActual = document.createElement("option");
        optionActual.innerHTML = _mascota.nombre;
        optionActual.value = index;
        mascota.appendChild(optionActual);
      });
    }
  } catch(error){
    console.log({error});
    $(".alert-danger").show();  
  }
}

async function listarVeterinarios() {
  const entidad = "veterinarios";
  try{
    const respuesta = await fetch(`${url}/${entidad}`);
    const veterinariosDelServer = await respuesta.json();
    if(Array.isArray(veterinariosDelServer)){
      veterinarios = veterinariosDelServer
    }
    if(respuesta.ok){
      veterinarios.forEach((_veterinario, index)=>{
        const optionActual = document.createElement("option");
        optionActual.innerHTML = `${_veterinario.nombre} ${_veterinario.apellido}`;
        optionActual.value = index;
        veterinario.appendChild(optionActual);
      });
    }
  } catch(error){
    
    console.log({error});
    $(".alert-danger").show();
  }
}

function editar(index){  
  return function clickeo(){
    btnGuardar.innerHTML = 'Editar'
    //$('#exampleModalCenter').modal('toggle');
    const consulta = consultas[index];
    indice.value = index;
    mascota.value = consulta.mascota.id;
    veterinario.value = consulta.veterinario.id;
    historia.value = consulta.historia;
    diagnostico.value = consulta.diagnostico;
  }
}

async function enviarDatos(evento){
  const entidad = "consultas";
  evento.preventDefault();
  try{
    const datos = {
      mascota: mascota.value,
      veterinario: veterinario.value,
      historia: historia.value,
      diagnostico:diagnostico.value,
    };
    if(validar(datos) === true){
      const accion = btnGuardar.innerHTML;
      let urlEnvio = `${url}/${entidad}`;
      let method = "POST";
      if(accion === "Editar"){
        urlEnvio +=`/${indice.value}`;
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
        listarConsultas();
        resetModal();
      }
      formulario.classList.add('was-validated');
      return;
    } 
    $(".alert-warning").show();
    
  }catch(error){
      console.log({error});
      $(".alert-danger").show();
  } 
}

function resetModal(){
  btnGuardar.innerHTML = "Save";
  [mascota, veterinario, historia, diagnostico, indice].forEach((inputActual)=>{
    inputActual.value="";
    inputActual.classList.remove("is-invalid");
    inputActual.classList.remove("is-valid");
  });
  $(".alert-warning").hide();
  Mymodal.toggle();
}

function validar(datos){
  if(typeof datos !== 'object') return false;
  let respuesta = true;
  for(let llave in datos){
    if(datos[llave].length === 0){
      document.getElementById(llave).classList.add("is-invalid");
      respuesta = false;
    } else {
      document.getElementById(llave).classList.remove("is-invalid");
      document.getElementById(llave).classList.add("is-valid");
    }
  }
  if(respuesta === true) $(".alert-warning").hide();
  return respuesta;
}

listarConsultas();
listarVeterinarios();
listarMascotas();
btnGuardar.onclick = enviarDatos;
