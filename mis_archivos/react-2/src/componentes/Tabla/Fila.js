import React from "react";

function Fila(mascota, index){
  return(
    <tr>
      <th scope="row">{index}</th>
      <td>{mascota.tipo}</td>
      <td>{mascota.nombre}</td>
      <td>{mascota.dueño}</td>
      <td>
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fas fa-edit"></i></button>
            <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
        </div>
      </td>
    </tr>
  );
}

export default Fila;